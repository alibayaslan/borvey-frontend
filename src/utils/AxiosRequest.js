/* eslint-disable no-unused-vars */
import axios from "axios";
import { ApiRoutes } from "./ApiRoutes";
// export const BASE_URL = "http://localhost:5050";
const BASE_URL = "https://borvey-backend-32b00d872bd0.herokuapp.com/";


export const AxiosRequest = (method, url, data) => {
  const token = localStorage.getItem("token");
  const config = {
    method: method,
    baseURL: BASE_URL,
    headers: {
      Authorization: `${token}`,
    },
    url: url,
    data: data,
  };

  return axios(config);
};
