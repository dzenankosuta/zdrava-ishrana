import axios from "axios";
import { restApiUrl } from "../../../config/api";

export const addCustomer = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const customer = await axios.post(
        `${restApiUrl.prod}/user/customer`,
        data,
        config
      );
      resolve(customer);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const editCustomer = (data, token, customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const customer = await axios.put(
        `${restApiUrl.prod}/user/customer/${customerID}`,
        data,
        config
      );
      resolve(customer);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getCustomers = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const customers = await axios.get(
        `${restApiUrl.prod}/user/customers`,
        config
      );
      // if (customers.data) {
      //   resolve(customers);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(customers);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const deleteCustomer = (token, customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const customer = await axios.delete(
        `${restApiUrl.prod}/user/customer/${customerID}`,
        config
      );
      resolve(customer);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getDenyAndLastAppointment = (token, customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const customerInfo = await axios.get(
        `${restApiUrl.prod}/user/deny-customer-appointment/${customerID}`,
        config
      );
      resolve(customerInfo);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const denyCustomer = (data, token, customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const deniedCustomer = await axios.put(
        `${restApiUrl.prod}/user/deny-customer-appointment/${customerID}`,
        data,
        config
      );
      resolve(deniedCustomer);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });
