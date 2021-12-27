"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const setInterceptor = (serv) => {
    serv.interceptors.response.use(function (_response) {
        // Do something with response data
        return _response;
    });
};
const responseConfig = {
    setInterceptor,
};
exports.default = responseConfig;
