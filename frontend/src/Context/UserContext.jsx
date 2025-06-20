import React, { createContext, useState, useContext, useEffect } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  // Start with undefined to represent "loading"
  const [userData, setUserData] = useState(undefined);

  // Fetch current user from backend API
  const fetchCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });

      if (result.data) {
        setUserData(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
      } else {
        setUserData(null);
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
      setUserData(null);
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    // Load user from localStorage immediately (if exists)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    // Then fetch fresh user data from backend to verify session
    fetchCurrentUser();
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    reloadUser: fetchCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;


{/*import React, { createContext, useState, useContext, useEffect } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

// Export context immediately
export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });

      if (result.data) {
        setUserData(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
      }
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
      setUserData(null);
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUserData(JSON.parse(savedUser));
    fetchCurrentUser();
  }, [serverUrl]);

  return (
    <userDataContext.Provider value={{ userData, setUserData, reloadUser: fetchCurrentUser }}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;*/}




{/*import React, { createContext, useState, useContext, useEffect } from 'react';
import { authDataContext } from './AuthContext';
import axios from 'axios';

// Export context as named export
export const userDataContext = createContext();

function UserContext({ children }) {
  const { serverUrl } = useContext(authDataContext);
  const [userData, setUserData] = useState(null);

  const fetchCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });

      if (result.data) {
        setUserData(result.data);
        localStorage.setItem('user', JSON.stringify(result.data));
      }
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
      setUserData(null);
      localStorage.removeItem('user');
    }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }

    fetchCurrentUser();
  }, [serverUrl]);

  const value = {
    userData,
    setUserData,
    reloadUser: fetchCurrentUser,
  };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

// Export UserContext as default export
export default UserContext;*/}
