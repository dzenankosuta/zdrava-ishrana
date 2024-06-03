import axios from "axios";
import { restApiUrl } from "../../../config/api";

export const getLanguages = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/languages`);
    // console.log(response.data.data.flat());
    return response.data.data.flat();
  } catch (error) {
    // console.log(error);
  }
};
