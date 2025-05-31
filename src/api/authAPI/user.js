import { publicInstance, requestWithToken } from "@/utils/axios/axios-http";

export const getMe = async () => {
  try {
    const response = await requestWithToken(publicInstance, {
      url: "/users/me",
      method: "GET",
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error("Lấy thông tin người dùng không thành công");
  }
};
