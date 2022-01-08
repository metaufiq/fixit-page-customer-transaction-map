import {AxiosInstance, AxiosRequestConfig} from 'axios';
import Config from 'react-native-config';
import services from '../service';

const setGoogleMapsAPIKey = async (config: AxiosRequestConfig) => {
  switch (config.method) {
    case 'get':
      config.params.key = Config['GOOGLE_MAPS_API_KEY'];
      break;
  }

  return config;
};

const setInterceptor = (serv: AxiosInstance) => {
  serv.interceptors.request.use(function (config) {
    if (config.baseURL === services.GoogleMaps.defaults.baseURL) {
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
