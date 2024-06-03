import axios from "axios";
import { restApiUrl } from "../../../../config/api";

export const addAppointment = (data, token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointment = await axios.post(
        `${restApiUrl.prod}/user/appointment`,
        data,
        config
      );
      resolve(appointment);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const editAppointment = (data, token, appointmentID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointment = await axios.put(
        `${restApiUrl.prod}/user/appointment/${appointmentID}`,
        data,
        config
      );
      resolve(appointment);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getAppointments = (token) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointments = await axios.get(
        `${restApiUrl.prod}/user/admin-appointments`,
        config
      );
      resolve(appointments);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getAppointmentsByDate = (token, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointments = await axios.get(
        `${restApiUrl.prod}/user/admin-appointments?date=${date}`,
        config
      );
      resolve(appointments);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getAdminAppointmentsByDate = (token, date) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointments = await axios.get(
        `${restApiUrl.prod}/user/admin-appointments?date=${date}&appointments=admin`,
        config
      );
      resolve(appointments);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getWorkerAppointments = (token, workerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointments = await axios.get(
        `${restApiUrl.prod}/user/worker-appointments/${workerID}`,
        config
      );
      resolve(appointments);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const getCustomerAppointments = (token, customerID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointments = await axios.get(
        `${restApiUrl.prod}/user/customer-appointments/${customerID}`,
        config
      );
      // if (appointments.data) {
      //   resolve(appointments);
      // } else {
      //   throw new Error('No data');
      // }
      resolve(appointments);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });

export const deleteAppointment = (token, appointmentID) =>
  new Promise(async (resolve, reject) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      };
      const appointment = await axios.delete(
        `${restApiUrl.prod}/user/appointment/${appointmentID}`,
        config
      );
      resolve(appointment);
    } catch (error) {
      reject(error);
      // console.log(error);
    }
  });
