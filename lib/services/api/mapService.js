"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleMapsAPI_1 = __importDefault(require("../../config/services/services/GoogleMapsAPI"));
const detail = async (data) => {
    const params = { latlng: data.latitude.concat(`,${data.longitude}`) };
    const res = await GoogleMapsAPI_1.default.get('', {
        params,
    });
    return res.data;
};
const mapService = {
    detail,
};
exports.default = mapService;
