import React, { useEffect, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
  isLoggedIn: {
    state: false,
    user: {
      name: null,
      email: null,
      profile: null,
    },
  },
  isLoading: false,
  onLogout: (email) => {},
  onLogin: (user) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState({
    state: false,
    user: { name: null, email: null, profile: null },
  });

  useEffect(() => {
    console.log("running useEffect");
    async function sendRequest(accessToken) {
      console.log("request sent");
      try {
        const response = await axios.get(
          "http://localhost:4000/api/students/checkLogin",
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (response.data[0].is_login === true) {
          setIsLoggedIn({
            state: true,
            user: {
              name: response.data[0].student_name,
              email: response.data[0].email,
              profile: response.data[0].profile || undefined,
            },
          });
        }
        setIsLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        setIsLoading(false);
        throw new Error(err);
      }
    }
    let token = localStorage.getItem("token");
    if (token !== null) sendRequest(token);
    else setIsLoading(false);
  }, []);

  const loginHandler = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/students/login",
        data
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.accessToken);
        setIsLoggedIn({
          state: true,
          user: {
            name: response.data.user.student_name,
            email: response.data.user.email,
            profile: response.data.user.profile,
          },
        });
      }
    } catch (err) {
      return err.response;
    }
  };

  const logoutHandler = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/students/logout",
        { email }
      );
      if (response.status === 200) {
        localStorage.removeItem("token");
        setIsLoggedIn({
          state: false,
          user: {
            name: null,
            email: null,
            profile: null,
          },
        });
        return true;
      }
    } catch (err) {
      return err.response;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading: isLoading,
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
