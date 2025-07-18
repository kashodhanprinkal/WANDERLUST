import React, { createContext, useState } from 'react';

// Export context immediately
export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "https://wanderlust-backend-69cz.onrender.com";
  let [loading,setLoading] = useState(false)
  
  const value = { serverUrl,
                  loading,setLoading
    };


  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;




