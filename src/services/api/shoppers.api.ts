import axios from "axios";

export const API_BASE_URL = "https://shoperz.onrender.com/";
export const ENDPOINTS = {
  products: "products",
  cart: "cart",
  categories: {
    category: "categories",
  },
  upload: "upload/product",
  auth: {
    signup: "auth/signup",
    login: "auth/login",
    resetPassword: "auth/resetpassword",
    verifyEmail: "auth/send-verify-email",
  },
};

export const sendSignupData = async (body: any) => {
  try {
    const { data } = await axios({
      baseURL: API_BASE_URL,
      url: ENDPOINTS.auth.signup,
      method: "POST",
      headers: {
        "Content-Type": "application/json ;charset=UTF-8",
      },
      data: body,
    });

    return await data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
