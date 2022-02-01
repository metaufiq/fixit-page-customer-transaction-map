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
const template_transaction_map_1 = __importDefault(require("@fixit/template-transaction-map"));
;
const TransactionOTW = (props) => {
    const { transaction } = props.route.params;
    const { detail } = props.route.params.transaction;
    const { customer_location } = detail;
    const [mapData, setMapData] = React.useState(customer_location.map);
    const onSubmit = () => {
        props.navigation.goBack();
    };
    return (<template_transaction_map_1.default bottomButtonBarLabel='Tutup' locationName={detail.customer_location.address.value} locationNameDetail={customer_location.address.detail} mapData={mapData} navigation={props.navigation} serviceLocation={customer_location.map} onRegionChange={setMapData} onSubmit={onSubmit} transaction={transaction} routes={transaction.routes} showButtonTransactionDetail/>);
};
exports.default = TransactionOTW;
