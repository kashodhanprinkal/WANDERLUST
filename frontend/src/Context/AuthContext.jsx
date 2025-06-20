import React, { createContext, useState } from 'react';

// Export context immediately
export const authDataContext = createContext();

function AuthContext({ children }) {
  const serverUrl = "http://localhost:8000";
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





{/*import React, { createContext } from 'react';

// Create the context
export const authDataContext = createContext();

function AuthContext({ children }) {
  let serverUrl = "http://localhost:8000"; // Backend server URL
  let value = { serverUrl };

  return (
    <authDataContext.Provider value={value}>
      {children}
    </authDataContext.Provider>
  );
}

export default AuthContext;*/}
