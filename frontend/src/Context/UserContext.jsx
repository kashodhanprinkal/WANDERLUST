import React, { createContext, useState, useContext, useEffect } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);

  const [userData, setUserData] = useState(undefined);

  const fetchCurrentUser = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/currentuser`,
        {
          withCredentials: true,
        }
      );

      setUserData(result.data);
      localStorage.setItem("user", JSON.stringify(result.data));
    } catch (error) {
      // If user is not logged in, don't show an error
      if (error.response?.status === 401) {
        setUserData(null);
        localStorage.removeItem("user");
        return;
      }

      console.error("Error fetching current user:", error);
      setUserData(null);
      localStorage.removeItem("user");
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    fetchCurrentUser();
  }, [serverUrl]);

  return (
    <userDataContext.Provider
      value={{
        userData,
        setUserData,
        reloadUser: fetchCurrentUser,
      }}
    >
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;