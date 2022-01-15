/// <reference types="react" />
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';
interface Props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<Record<any, {
        transaction: Transaction;
    }>, any>;
}
declare const TransactionOTW: (props: Props) => JSX.Element;
export default TransactionOTW;
