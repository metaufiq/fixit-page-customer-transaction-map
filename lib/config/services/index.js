"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("./api/request"));
const response_1 = __importDefault(require("./api/response"));
const GoogleMaps_1 = __importDefault(require("./services/GoogleMaps"));
const service = {
    GoogleMaps: GoogleMaps_1.default,
};
const serviceTemp = service;
for (let key in serviceTemp) {
    let serv = serviceTemp[key];
    request_1.default.setInterceptor(serv);
    response_1.default.setInterceptor(serv);
    // Do something with value
}
exports.default = service;
