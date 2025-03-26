/* eslint-disable*/
import React, { useState } from "react";
import lineTop from "../../assets/images/lineTop.png";
import lineLeft from "../../assets/images/lineLeft.png";

import "./Auth.scss";
import NoRegister from "@/components/auth/register/NoRegister";
import RegisterForm from "@/components/auth/register/RegisterForm";
import NoLoginForm from "../../components/auth/login/NoLoginForm";
import LoginForm from "@/components/auth/login/LoginForm";
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container_left">
          <img className="line-top" src={lineTop} />
          <img className="line-bottom" src={lineTop} />
          <img className="line-left" src={lineLeft} />
          <img className="line-right" src={lineLeft} />
          {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} isLogin={isLogin} />
          ) : (
            <NoRegister setIsLogin={setIsLogin} isLogin={isLogin} />
          )}
        </div>
        <div className="auth-container_right">
          {isLogin ? (
            <NoLoginForm setIsLogin={setIsLogin} isLogin={isLogin} />
          ) : (
            <RegisterForm setIsLogin={setIsLogin} isLogin={isLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
