import express from 'express';
import isAuth from '../middleware/isAuth.js';
import { 
    getCurrentUser,
    updateProfile,
    uploadAvatar,
    getPublicProfile,
    getUserProfileById
} from '../controller/user.controller.js';
import upload from '../middleware/multer.js';

const userRouter = express.Router();

userRouter.get("/currentuser", isAuth, getCurrentUser);
userRouter.patch("/profile", isAuth, updateProfile);
userRouter.post("/avatar", isAuth, upload.single('avatar'), uploadAvatar);
userRouter.get('/profile/:userId', getPublicProfile);
userRouter.get("/profile/:userId", getUserProfileById);


export default userRouter;