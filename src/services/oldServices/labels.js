import axios from "axios";
import { restApiUrl } from "../../../config/api";

export const labels = (data) =>
  new Promise(async (resolve, reject) => {
    try {
      const labels = await axios.post(`${restApiUrl.prod}/app/labels`, data);
      resolve(labels);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });
