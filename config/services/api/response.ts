import {AxiosInstance} from 'axios';

const setInterceptor = (serv: AxiosInstance) => {
  serv.interceptors.response.use(function (_response) {
    // Do something with response data
    return _response;
  });
};

const responseConfig = {
  setInterceptor,
};
export default responseConfig;
