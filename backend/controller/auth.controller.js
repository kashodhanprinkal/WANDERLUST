import genToken from "../config/token.js"
import User from "../model/user.model.js"
import bcrypt from "bcryptjs"

export const signUp = async (req,res)=>{
    try {
        let{name,email,password} = req.body
        let existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({message: "user already exist"})
        }
        let hashPassword = await bcrypt.hash(password,10)
        let user = await User.create({name, email, password:hashPassword})
        let token = genToken(user._id)
        res.cookie("token",token, {
            httpOnly:true,
            secure:true,
            sameSite : "None",
            maxAge: 7 * 24 *60 *60 *1000
        })
        return res.status(201).json(user)

    } catch (error) {
        return res.status(500).json({message: ' signup error ${error}'})
    }
}  

export const login = async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await User.findOne({ email }).populate("listing","title image1 image2 image3 image4 image5 description rent category city landmark");

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        let token = genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: `Login error: ${error.message}` });
    }
};


export const logOut = (req, res) => {
    try {
      res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      });
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: `Logout error: ${error.message}` });
    }
  };
  

 
    
