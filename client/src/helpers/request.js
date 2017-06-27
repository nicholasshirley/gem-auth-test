import axios from 'axios';
import {getEnv} from '../config/app'

export const request = (opts = { 
    'access-token': null,
    'client': null,
    'expiry': null,
    'token-type': null,
    'uid': null 
  }) => {

  const defaultOptions = {
    headers: {
      ...opts
    },
  };
  /*
  |--------------------------------------------------
  | Custom axios api
  |--------------------------------------------------
  */
  var axiosApi = axios.create({
    baseURL: getEnv(),
  });

  return {
    get: (url, options = {}) => axiosApi.get(url, { ...defaultOptions, ...options }),
    post: (url, data, options = {}) => axiosApi.post(url, data, { ...defaultOptions, ...options }),
    put: (url, data, options = {}) => axiosApi.put(url, data, { ...defaultOptions, ...options }),
    delete: (url, options = {}) => axiosApi.delete(url, { ...defaultOptions, ...options }),
  };

};

export default request;
