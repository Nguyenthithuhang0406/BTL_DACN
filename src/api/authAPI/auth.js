import { publicInstance, request } from "@/utils/axios/axios-http";

export const register = async (data) => {
  try {
    const { username, password, email, firstName, lastName } = data;

    await request(publicInstance, {
      url: "/auths/register",
      method: "POST",
      data: {
        username,
        password,
        email,
        firstName,
        lastName,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Đăng ký không thành công");
  }
};

export const login = async (data) => {
  try {
    const { username, password } = data;
    const response = await request(publicInstance, {
      url: "/auths/login",
      method: "POST",
      data: {
        username,
        password,
      },
    });
    const { accessToken, refreshToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Đăng nhập không thành công");
  }
};
