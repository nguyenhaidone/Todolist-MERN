import React from "react";
import LoginForm from "../components/auth/LoginForm";
import RegisterForm from "../components/auth/RegisterForm";
import { AuthContext } from "../Contexts/AuthContext";
import { useContext } from "react";
import { Redirect } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
// import
const Auth = ({ authRoute }) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);
  console.log({ authLoading, isAuthenticated });
  let body;
  if (authLoading) {
    body = (
      <div className="d-flex justify-content-center mt-2">
        <Spinner anmimation="border" variant="infor" />
      </div>
    );
  } else if (isAuthenticated) return <Redirect to="/dashboard" />;
  else
    body = (
      <>
        {/* Learnit */}
        {authRoute === "login" ? <LoginForm /> : <RegisterForm />}
      </>
    );
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1>Learn it</h1>
          <h4>Keep track of what you are learning</h4>
          {body}
        </div>
      </div>
    </div>
  );
};

export default Auth;
