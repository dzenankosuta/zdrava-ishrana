import axios from "axios";
import { restApiUrl } from "../../config/api";

export const getProducts = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/products`);
    return response.data.data.products;
  } catch (error) {
    throw error;
  }
};

export const getRecommendProducts = async () => {
  try {
    const response = await axios.get(
      `${restApiUrl.prod}/app/recommended-products`
    );
    return response.data.data.products;
  } catch (error) {
    throw error;
  }
};

export const getOnSaleProducts = async () => {
  try {
    const response = await axios.get(`${restApiUrl.prod}/app/products-on-sale`);
    return response.data.data.products;
  } catch (error) {
    throw error;
  }
};
