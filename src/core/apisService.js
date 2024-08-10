import newAxios from 'axios';
import { ACCESS_TOKEN_KEY } from './constants';
import { createAxiosInstance } from './axios';

export default class NewService {
  headers = {};
  newAxios;
  defaultOptions = { namespace: undefined };

  constructor(options) {
    this.defaultOptions = { ...this.defaultOptions, ...options };
    // console.log('process.env', process.env);
    // console.log('window.env', window.env);
    const API_URL = process.env.REACT_APP_API_ENDPOINT;
    this.newAxios = createAxiosInstance();
  }
  apiUlr() {
    console.log(process.env.REACT_APP_API_ENDPOINT);
    return process.env.REACT_APP_API_ENDPOINT;
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
      const response = await this.newAxios.request(opts);
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
    return newAxios.put(url, file, {
      headers: { 'Content-Type': contentType },
    });
  }
}
