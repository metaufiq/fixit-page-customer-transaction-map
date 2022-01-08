
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';
import CurrentTransaction from './CurrentTransaction';
import NewTransaction from './NewTransaction';

interface mainProps{
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<any, { transaction: Transaction }>, any>;
};
const TransactionMap = (props: mainProps) => {
  let { transaction } = props.route.params!;

  if (transaction.status === 'current') {
    return CurrentTransaction(props);
  }else if (transaction.status === 'new') {
    return NewTransaction(props);
  }
};

export default TransactionMap;
