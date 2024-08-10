import axios from 'axios';
import { ACCESS_TOKEN_KEY } from 'core/constants';
import { createAxiosInstance } from './axios';

export default class Service {
  headers = {};
  axios;
  defaultOptions = { namespace: undefined };

  constructor(options) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    // console.log('process.env', process.env);
    // console.log('window.env', window.env);
    if (window.env && window.env.API_ENV === 'production') {
      const API_ENDPOINT = `//${window.env.BASE_API_URL}/api/v1`;
      this.axios = createAxiosInstance({
        baseURL: API_ENDPOINT,

      });
    } else {
      // console.log('process.env', process.env);
      // console.log('window.env', window.env);

      // const API_ENDPOINT = window.env.REACT_APP_BASE_API_URL || 'api-admin.shopdi.io';
      // const endpoint = `//${API_ENDPOINT}/api/v1`;
      this.axios = createAxiosInstance({
        baseURL: 'https://api-admin.shopdi.io/api/v1',
      });
    }
  }

  toQueryString(params) {
    const keys = Object.keys(params);
    const segments = keys.map(
      (k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`
    );
    return segments.join('&');
  }

  async restAsync(
    action,
    params = {},
    options = {
      headers: {},
      method: 'post',
    }
  ) {
    const { headers } = options;
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    try {
      const opts = {
        url: action,
        method: options.method,
        data: params,
        headers,
      };
      if (token) {
        Object.assign(opts.headers, { Authorization: `Bearer ${token}` });
      }
      const response = await this.axios.request(opts);
      return response?.data;
    } catch (err) {
      if (err.response.status === 401) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.location.reload();
      }
      throw err.response;
    }
  }

  postFormData(action, data) {
    const headers = {
      'Content-Type': 'multipart/form-data',
    };
    return this.restAsync(action, data, {
      method: 'post',
      headers,
    });
  }

  get(action, params = {}, options = {}) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.restAsync(
      path,
      {},
      {
        method: 'get',
        headers,
      }
    );
  }

  post(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'post',
      headers,
    });
  }

  put(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'put',
      headers,
    });
  }

  delete(action, params = {}, options = {}) {
    const { headers = {} } = options;
    return this.restAsync(action, params, {
      method: 'delete',
      headers,
    });
  }

  uploadWithPreSignedUrl(config, file) {
    const { url, contentType } = config;
    return axios.put(url, file, { headers: { 'Content-Type': contentType } });
  }
}
