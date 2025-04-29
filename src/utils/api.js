import axios from "axios";

const api = process.env.REACT_APP_BACKEND_API;


function getAccessTokenFromLocalStorage() {
  return localStorage.getItem("accessToken");
}

export const authorizedApi = axios.create({
  baseURL: api,
  timeout: 3000000,
  headers: {
    "Content-Type": "application/json",
  },
});

authorizedApi.interceptors.request.use(
  (config) => {
    const token = getAccessTokenFromLocalStorage();
    console.log(api)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const unauthorizedApi = axios.create({
  baseURL: api,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
