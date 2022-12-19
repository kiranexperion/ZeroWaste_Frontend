import React, { useState } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});



export const AuthContextProvider = (props) => {


  const [token, setToken] = useState(null);
  const userIsLoggedIn = !!token;
  console.log(token);
 

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    setToken(null);
   
  };

  const loginHandler = (token) => {
    setToken(token);
  };

  const contextValue = {
   
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
   
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;