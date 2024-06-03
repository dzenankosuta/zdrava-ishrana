import axios from "axios";
import { restApiUrl } from "../../config/api";

export const getLogStatistic = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/log-statistic`);
    return response.data.data.statistics["log-statistics"];
  } catch (error) {
    throw new Error(error.response.data.message || "Request failed");
  }
};

export const addStatistic = async (data) => {
  try {
    const response = await axios.post(
      `${restApiUrl.prod}/app/statistic`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "Request failed");
  }
};
