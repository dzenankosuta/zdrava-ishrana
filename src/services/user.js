import axios from "axios";
import { store } from "../../store";
import { authSlice } from "../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restApiUrl } from "../../config/api";

const setToken = async (token) => {
  await AsyncStorage.setItem("auth_token", token);
};
const setUserData = async (data) => {
  await AsyncStorage.setItem("userData", data);
};

export const login = async (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await axios.post(`${restApiUrl.prod}/login`, data);
      const res = { ...user };
      if (!user.data) {
        const message = res.response.data.message;
        throw Object.assign(new Error(), { code: 442, message });
      }
      const { access_token: token } = user.data;
      const { id } = user.data.user;
      const { user: userData } = user.data;
      store.dispatch(authSlice.actions.auth({ token, id, userData }));
      setToken(token);
      setUserData(JSON.stringify(userData));
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });

export const signup = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await axios.post(`${restApiUrl.prod}/register`, data);
      resolve(user);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const deleteUser = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await axios.delete(`${restApiUrl.prod}/user/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      resolve(user);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getUserInfo = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const userInfo = await axios.get(`${restApiUrl.prod}/user/me`, config);
      // if (userInfo.data) {
      //   resolve(userInfo);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(userInfo);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });
