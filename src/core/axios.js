import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.baseURL = process.env.REACT_APP_API_URL_DOTNET;

let axiosInstance = null;

export const createAxiosInstance = (options) => {
  // eslint-disable-next-line prefer-object-spread
  const opts = Object.assign(
    { responseType: 'json', headers: {} },
    options
  );
  if (!axiosInstance) {
    axiosInstance = axios.create(opts);
  }
  return axiosInstance;
};
export default {
  createAxiosInstance,
};
