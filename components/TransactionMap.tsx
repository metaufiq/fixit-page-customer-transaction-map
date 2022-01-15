
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';
import TransactionOTW from './TransactionOTW';
import NewTransaction from './NewTransaction';
import { Status } from '@fixit/fixit-common-types/lib/domain/transaction';

interface Props{
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<any, { transaction: Transaction }>, any>;
};


type TransactionComponent = {
  [key in Status]: (props:Props) =>JSX.Element;
};

const TransactionComponent: TransactionComponent = {
  onTheWay: TransactionOTW,
  new: NewTransaction,
  onProgress: TransactionOTW,
  finished: TransactionOTW
}

const TransactionMap = (props: Props) => {
  let { transaction } = props.route.params!;


  return TransactionComponent[transaction.status](props);
};

export default TransactionMap;
