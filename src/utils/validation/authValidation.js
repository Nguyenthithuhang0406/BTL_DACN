/* eslint-disable*/
import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Họ tên không được để trống")
    .min(2, "Họ tên phải có ít nhất 2 ký tự")
    .max(50, "Họ tên không được quá 50 ký tự"),
  email: Yup.string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email không được để trống")
    .max(100, "Email không được quá 100 ký tự"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/[a-zA-Z]/, "Mật khẩu chỉ được chứa các ký tự Latin."),
  phoneNumber: Yup.string()
    .required("Số điện thoại không được để trống")
    .matches(/^\d+$/, "Số điện thoại chỉ được chứa các ký tự số.")
    .max(10, "Số điện thoại phải có ít nhất 10 chữ số"),
});

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống")
    .max(100, "Email không được quá 100 ký tự"),
  password: Yup.string()
    .required("Mật khẩu không được để trống")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .max(20, "Mật khẩu không được quá 20 ký tự")
    .matches(/[a-zA-Z]/, "Mật khẩu chỉ được chứa các ký tự Latin."),
});
