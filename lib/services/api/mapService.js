"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = __importDefault(require("../../config/services"));
const detail = async (data) => {
    const params = { latlng: data.latitude.concat(`,${data.longitude}`) };
    const res = await services_1.default.GoogleMaps.get('/json', {
        params,
    });
    return res.data;
};
const mapService = {
    detail,
};
exports.default = mapService;
