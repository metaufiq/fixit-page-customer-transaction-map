"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GoogleMaps_1 = __importDefault(require("./GoogleMaps"));
const services = {
    GoogleMaps: GoogleMaps_1.default,
};
exports.default = services;
