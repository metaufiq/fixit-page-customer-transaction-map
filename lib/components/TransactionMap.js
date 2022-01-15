"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransactionOTW_1 = __importDefault(require("./TransactionOTW"));
const NewTransaction_1 = __importDefault(require("./NewTransaction"));
;
const TransactionComponent = {
    onTheWay: TransactionOTW_1.default,
    new: NewTransaction_1.default,
    onProgress: TransactionOTW_1.default,
    finished: TransactionOTW_1.default
};
const TransactionMap = (props) => {
    let { transaction } = props.route.params;
    return TransactionComponent[transaction.status](props);
};
exports.default = TransactionMap;
