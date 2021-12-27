"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const GoogleMapsApi = axios_1.default.create({
    baseURL: 'https://maps.googleapis.com/maps/api/geocode/json',
});
exports.default = GoogleMapsApi;
