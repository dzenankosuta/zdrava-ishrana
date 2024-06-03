import axios from "axios";
import { restApiUrl } from "../../../config/api";

export const addWorker = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const user = await axios.post(
        `${restApiUrl.prod}/user/sign-up-staff`,
        data,
        config
      );
      resolve(user);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const editWorker = (data, token, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };
      const user = await axios.post(
        `${restApiUrl.prod}/user/${id}`,
        data,
        config
      );
      resolve(user);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getWorkers = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const workers = await axios.get(
        `${restApiUrl.prod}/user/workers`,
        config
      );
      // if (workers.data) {
      //   resolve(workers);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(workers);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getWorkersByServiceAdmin = (token, serviceID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const workers = await axios.get(
        `${restApiUrl.prod}/user/service-workers/${serviceID}?admin=list`,
        config
      );
      // if (workers.data) {
      //   resolve(workers);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(workers);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getWorkersByService = (token, serviceID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const workers = await axios.get(
        `${restApiUrl.prod}/user/service-workers/${serviceID}`,
        config
      );
      // if (workers.data) {
      //   resolve(workers);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(workers);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const deleteWorker = (token, id) =>
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

export const getDenyAndLastLogin = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const workerInfo = await axios.get(
        `${restApiUrl.prod}/user/deny-login`,
        config
      );
      // if (workerInfo.data) {
      //   resolve(workerInfo);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(workerInfo);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const denyWorker = (data, token, id) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      const deniedUser = await axios.put(
        `${restApiUrl.prod}/user/deny/${id}`,
        data,
        config
      );
      resolve(deniedUser);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const addServiceToWorker = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const service = await axios.post(
        `${restApiUrl.prod}/user/service-worker`,
        data,
        config
      );
      resolve(service);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getWorkerServices = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const services = await axios.get(
        `${restApiUrl.prod}/user/services`,
        config
      );
      // if (services.data) {
      //   resolve(services);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(services);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const deleteServiceForWorker = (token, serviceID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const service = await axios.delete(
        `${restApiUrl.prod}/user/service-worker/${serviceID}`,
        config
      );
      resolve(service);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const workerCalendar = (token, from, to) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const timeSlots = await axios.get(
        `${restApiUrl.prod}/user/worker-calendar?from=${from}&to=${to}`,
        config
      );
      // if (timeSlots.data) {
      //   resolve(timeSlots);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(timeSlots);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });
