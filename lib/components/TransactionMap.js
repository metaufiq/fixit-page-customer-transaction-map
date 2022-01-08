"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CurrentTransaction_1 = __importDefault(require("./CurrentTransaction"));
const NewTransaction_1 = __importDefault(require("./NewTransaction"));
;
const TransactionMap = (props) => {
    let { transaction } = props.route.params;
    if (transaction.status === 'current') {
        return CurrentTransaction_1.default(props);
    }
    else if (transaction.status === 'new') {
        return NewTransaction_1.default(props);
    }
};
exports.default = TransactionMap;
