import {AxiosInstance, AxiosRequestConfig} from 'axios';
import { GOOGLE_MAPS_API_KEY } from 'react-native-dotenv';
import GoogleMapsApi from '../services/GoogleMapsAPI';

const setGoogleMapsAPIKey = async (config: AxiosRequestConfig) => {
  switch (config.method) {
    case 'get':
      config.params.key = GOOGLE_MAPS_API_KEY;
      break;
  }

  return config;
};

const setInterceptor = (serv: AxiosInstance) => {
  serv.interceptors.request.use(function (config) {
    if (config.baseURL === GoogleMapsApi.defaults.baseURL) {
      return new Promise(async resolve => {
        config = await setGoogleMapsAPIKey(config);
        resolve(config);
      });
    }
  });
};

const requestConfig = {
  setInterceptor,
};
export default requestConfig;
