"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const template_transaction_map_1 = __importDefault(require("@fixit/template-transaction-map"));
const react_hook_form_1 = require("react-hook-form");
const geolocation_1 = __importDefault(require("@react-native-community/geolocation"));
const mapService_1 = __importDefault(require("../services/api/mapService"));
;
const TransactionMap = (props) => {
    let currentTransaction = props.route.params.transaction;
    const [mapData, setMapData] = React.useState();
    const [serviceLocation, setServiceLocation] = React.useState({
        latitude: 0,
        longitude: 0
    });
    const [locationName, setLocationName] = React.useState('Lokasi');
    const [locationNameDetail, setLocationNameDetail] = React.useState('Lokasi');
    const getLocationInformation = async (latitude, longitude) => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        try {
            const res = await mapService_1.default.detail({
                latitude: latitude.toString(),
                longitude: longitude.toString(),
            });
            if ((res === null || res === void 0 ? void 0 : res.results.length) === 0) {
                return;
            }
            setLocationName(`${(_b = (_a = res === null || res === void 0 ? void 0 : res.results[0]) === null || _a === void 0 ? void 0 : _a.address_components[1]) === null || _b === void 0 ? void 0 : _b.short_name}, ${(_d = (_c = res === null || res === void 0 ? void 0 : res.results[0]) === null || _c === void 0 ? void 0 : _c.address_components[0]) === null || _d === void 0 ? void 0 : _d.short_name}`);
            setLocationNameDetail((_f = (_e = res === null || res === void 0 ? void 0 : res.results[0]) === null || _e === void 0 ? void 0 : _e.formatted_address) !== null && _f !== void 0 ? _f : 'Lokasi');
        }
        catch (error) {
            const errorData = error;
            react_native_1.Alert.alert('Oops,There Is Some Error', (_h = (_g = errorData === null || errorData === void 0 ? void 0 : errorData.response) === null || _g === void 0 ? void 0 : _g.data) !== null && _h !== void 0 ? _h : errorData === null || errorData === void 0 ? void 0 : errorData.message);
        }
    };
    const requestLocationPermission = async () => {
        try {
            const granted = await react_native_1.PermissionsAndroid.request(react_native_1.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                title: 'Location Permission',
                message: 'MyMapApp needs access to your location',
                buttonPositive: 'ok',
            });
            if (granted === react_native_1.PermissionsAndroid.RESULTS.GRANTED) {
            }
            else {
                console.log('Location permission denied');
            }
        }
        catch (err) {
            console.warn(err);
        }
    };
    const getInnitialMapData = React.useCallback(async () => {
        geolocation_1.default.getCurrentPosition(async (position) => {
            setMapData({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0,
                longitudeDelta: 0,
            });
            setServiceLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            await getLocationInformation(position.coords.latitude, position.coords.longitude);
        }, (e) => {
            react_native_1.Alert.alert('Gagal', 'Periksa Kembali Jaringan dan Akses Lokasi Kamu');
        }, {
            enableHighAccuracy: false,
            timeout: 50000,
            maximumAge: 10000,
        });
    }, []);
    React.useEffect(() => {
        getInnitialMapData();
    }, [getInnitialMapData]);
    React.useEffect(() => {
        if (!serviceLocation) {
            return;
        }
        getLocationInformation(serviceLocation.latitude, serviceLocation.longitude);
    }, [serviceLocation]);
    React.useEffect(() => {
        requestLocationPermission();
    }, []);
    const formData = react_hook_form_1.useForm();
    const onSubmit = (data) => {
        currentTransaction.detail.customer_location.additional_information =
            data.additional_information;
        currentTransaction.detail.customer_location.map = serviceLocation;
        currentTransaction.detail.customer_location.address.value = locationName;
        currentTransaction.detail.customer_location.address.detail =
            locationNameDetail;
        props.navigation.navigate('WorkerList', { transaction: currentTransaction });
    };
    const handleSubmit = formData.handleSubmit(onSubmit);
    return (<template_transaction_map_1.default control={formData.control} bottomButtonBarLabel='Lanjutkan' locationName='' locationNameDetail='' mapData={mapData} navigation={props.navigation} serviceLocation={serviceLocation} onRegionChange={setMapData} onSubmit={handleSubmit} transaction={currentTransaction} routes={currentTransaction.routes}/>);
};
exports.default = TransactionMap;
