import axios from "axios";
import { restApiUrl } from "../../config/api";

export const getStories = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/stories`);
    return response.data.data.stories;
  } catch (error) {
    throw error;
  }
};
