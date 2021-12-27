import { Transaction as CommonTransaction } from '@fixit/fixit-common-types/lib/domain/transaction';
import { LatLng } from 'react-native-maps';
interface Transaction extends CommonTransaction {
    routes: LatLng[];
}
export default Transaction;
