/* eslint-disable */
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import "./RegisterForm.scss";
const RegisterForm = ({ setIsLogin, isLogin }) => {
  const initiateValues = {
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div
      className={`register ${isLogin ? "translate-left" : "translate-other"}`}
    >
      <h1>Đăng ký</h1>
      <div className="register-form">
        <Formik initialValues={initiateValues}>
          <Form>
            <div className="register-form_item">
              <label className="register-form_title" htmlFor="fullName">
                Họ và tên
              </label>
              <Field
                className="register-form_input"
                type="text"
                name="fullName"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className="register-form_item">
              <label className="register-form_title" htmlFor="email">
                Email
              </label>
              <Field
                className="register-form_input"
                type="email"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className="register-form_item">
              <label className="register-form_title" htmlFor="phoneNumber">
                Số điện thoại
              </label>
              <Field
                className="register-form_input"
                type="text"
                name="phoneNumber"
              />
              <ErrorMessage
                name="phoneNumber"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
            </div>
            <div className="register-form_item password">
              <label className="register-form_title" htmlFor="password">
                Mật khẩu
              </label>
              <Field
                className="register-form_input"
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
            {/* <div className="register-form_item password">
              <label className="register-form_title" htmlFor="confirmPassword">
                Xác nhận lại mật khẩu
              </label>
              <Field
                className="register-form_input"
                type="password"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                style={{ color: "red", fontSize: "12px" }}
              />
              <FaEyeSlash className="eye" />
            </div> */}
            <button>Đăng ký</button>
            <p>
              Bạn đã có tài khoản?{" "}
              <span onClick={() => setIsLogin(true)}>Đăng nhập</span>
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

export default RegisterForm;
