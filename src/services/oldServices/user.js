import axios from "axios";
import { store } from "../../../store";
import { authSlice } from "../../store/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { restApiUrl } from "../../../config/api";

const setToken = async (token) => {
  await AsyncStorage.setItem("auth_token", token);
};
const setUserData = async (data) => {
  await AsyncStorage.setItem("userData", data);
};
const setWorkersData = async (data) => {
  await AsyncStorage.setItem("workersData", data);
};

export const login = async (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await axios.post(`${restApiUrl.prod}/user/login`, data);
      const res = { ...user };
      if (!user.data) {
        const message = res.response.data.message;
        throw Object.assign(new Error(), { code: 442, message });
      }
      const { token } = user.data.data;
      const { id, type } = user.data.data.user;
      const isAdmin = type === "admin" ? true : false;
      store.dispatch(authSlice.actions.auth({ token, id, isAdmin }));
      setToken(token);
      setUserData(JSON.stringify(user.data.data.user));
      if (isAdmin) {
        setWorkersData(JSON.stringify(user.data.data.child));
      }
      //   const { id } = useSelector((state) => state.auth);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });

export const signup = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      //   const { token } = useSelector((state) => state.auth);
      //   const config = {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      //   Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiOTU3ODZkMDc5ZjA5M2Q4MTAxNGE0ZGVmMGQzZjVhZGY0MDQ0MzJkYTY0NTE5ZGVlZjRlZWJkY2FjMDA4MDNiM2U5ZjFhNzdjYmIxMTgzZTMiLCJpYXQiOjE2Nzk1NzU4MjkuNzEwMDYxMDczMzAzMjIyNjU2MjUsIm5iZiI6MTY3OTU3NTgyOS43MTAwNjIwMjY5Nzc1MzkwNjI1LCJleHAiOjE2Nzk2NjIyMjkuNzA0ODgwOTUyODM1MDgzMDA3ODEyNSwic3ViIjoiMSIsInNjb3BlcyI6W119.vJNXVHHdz86yo5D0Q7a0jd_oQUfTg5BMfHscB5CXIav8oIvdNXPuEkd5eav6Pot-apYTCjt6QaSKPFXRHkWLJCUhwNlMkudmkRx7m9sMF-Ryn44r3Zo4qKmWCGKHFgmPvMOk-haf_w-YsKzBQqxCyxtwxD6Lbr8RQW2MDE6_7-exRKEevrEPXDFj4S4N9d9LCBvp_H18WoMT-s8OOdsvBIdPMMje8TtgIKzC_1X6Lsc5OirQheX4eKB6Fn9nm26_po_5OjHyc9L1d56XYLUXd-nl5eIfxAEqG44x6pOG3oqUTG1Q0fHd8xtgKCi_BW2oz4sSmm4kSTYXnxpg4Han6gsGG9lUBMSWMwrtP8HLpdxTqVOoh7ct-1PvgMjrYpRpOFbngBVmRTx0QzQB4F0bbWLUYo0cvwEjGGg478ZExM2Uh_z9xb1VOxmoBz59S-_DRGAL5ZDPXVOmXH8WUwjUIclV9HHe50F5ecN9zoXgKRV4YQuvQF61RhIPn89wrF0D0jxhUqoOy8OGynTbwSlDI-6a_nqJu9pOqhbxu7ttiB2qkpb9KVfn8-K06zVPePwnR_XglLMdpFjmnV2Pxz-2u4KaH55z0TlK7w5E8K5nAwI8Hq7zmpnpfXVqKNQJTQUYufHhhGVEM9-4_bRJ_Mv0BtkE2ef2rqZblvfg9fuozu0`,
      // },
      //   };
      const user = await axios.post(`${restApiUrl.prod}/user/sign-up`, data);
      resolve(user);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const newPassword = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const info = await axios.post(
        `${restApiUrl.prod}/user/forgot-password`,
        data
      );
      resolve(info);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const deleteUser = (token, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const user = await axios.delete(`${restApiUrl.prod}/user/${id}`, config);
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
