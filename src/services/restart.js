import axios from "axios";
import { restApiUrl } from "../../config/api";

export const getRestartContent = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/restart-sections`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRestartSections = async () => {
  try {
    const response = await axios.get(
      `${restApiUrl.prod}/app/restart-section-tabs`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEducationRestartSections = async () => {
  try {
    const response = await axios.get(
      `${restApiUrl.prod}/app/restart-section-education-tabs`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProperNutritionSections = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/proper-nutrition`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
