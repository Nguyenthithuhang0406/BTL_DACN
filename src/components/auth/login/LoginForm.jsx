/* eslint-disable */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import "./LoginForm.scss";
const LoginForm = ({ setIsLogin, isLogin }) => {
  const initiateValues = {
    email: "",
    password: "",
  };
  return (
    <div className={`login ${isLogin ? "translate-right" : "translate-other"}`} >
      <h1>Đăng nhập</h1>
      <div className="login-form">
        <Formik initialValues={initiateValues}>
          <Form>
            <div className="login-form_item">
              <label className="login-form_title" htmlFor="email">
                Email
              </label>
              <Field className="login-form_input" type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className="login-form_item password">
              <label className="login-form_title" htmlFor="password">
                Mật khẩu
              </label>
              <Field
                className="login-form_input"
                type="password"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
              <FaRegEye className="eye" />
            </div>
            <button>Đăng nhập</button>
            <p>
              Bạn chưa có tài khoản?{" "}
              <span onClick={() => setIsLogin(false)}>Đăng ký</span>
            </p>
            <p>Hoặc</p>
            <div className="login-gg">
              <button>
                <FcGoogle />
                <p>Đăng nhập bằng Google</p>
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
