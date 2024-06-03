import axios from "axios";
import { restApiUrl } from "../../config/api";

export const getAdditiveCategories = async () => {
  try {
    const response = await axios.get(
      `${restApiUrl.prod}/app/additives-category`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAdditives = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/additives`);
    return response.data.data.additives;
  } catch (error) {
    throw error;
  }
};

export const getRandomAdditives = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/random-additives`);
    return response.data.data.additives;
  } catch (error) {
    throw error;
  }
};
