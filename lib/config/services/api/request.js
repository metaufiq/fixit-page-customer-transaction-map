"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_dotenv_1 = require("react-native-dotenv");
const __1 = __importDefault(require(".."));
const setGoogleMapsAPIKey = async (config) => {
    switch (config.method) {
        case 'get':
            config.params.key = react_native_dotenv_1.GOOGLE_MAPS_API_KEY;
            break;
    }
    return config;
};
const setInterceptor = (serv) => {
    serv.interceptors.request.use(function (config) {
        if (config.baseURL === __1.default.GoogleMaps.defaults.baseURL) {
            return new Promise(async (resolve) => {
                config = await setGoogleMapsAPIKey(config);
                resolve(config);
            });
        }
    });
};
const requestConfig = {
    setInterceptor,
};
exports.default = requestConfig;
