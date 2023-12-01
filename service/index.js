import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:5000",
  // withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    // Do something before request is sent
    // if (accessToken) {
    //   config.headers.common["Authorization"] = "Bearer " + accessToken;
    // }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 401) {
      window.location.assign("/");
      localStorage.removeItem("accessToken");
    }
    return {
      response,
      data: response.data,
    };
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      return { response: error };
    }
  }
);

const request = (url, options) => {
  return instance.request({ ...options, url: url });
};
export default request;