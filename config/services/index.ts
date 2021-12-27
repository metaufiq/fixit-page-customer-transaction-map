import {AxiosInstance} from 'axios';
import requestConfig from './api/request';
import responseConfig from './api/response';
import GoogleMapsAPI from './services/GoogleMapsAPI';

const service = {
  GoogleMapsAPI,
};

interface ServiceInstance {
  [key: string]: AxiosInstance;
}

const serviceTemp: ServiceInstance = service;

for (let key in serviceTemp) {
  let serv: AxiosInstance = serviceTemp[key];
  requestConfig.setInterceptor(serv);
  responseConfig.setInterceptor(serv);
  // Do something with value
}
export default service;
