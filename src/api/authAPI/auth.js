import { publicInstance, request } from "@/utils/axios/axios-http";

export const register = async (data) => {
  try {
    const { username, password, email, firstName, lastName } = data;
    
    await request(publicInstance,{
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
