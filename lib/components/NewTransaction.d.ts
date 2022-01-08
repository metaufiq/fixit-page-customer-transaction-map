/// <reference types="react" />
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';
interface mainProps {
    navigation: NavigationProp<any, any>;
    route: RouteProp<Record<any, {
        transaction: Transaction;
    }>, any>;
}
declare const NewTransaction: (props: mainProps) => JSX.Element;
export default NewTransaction;
