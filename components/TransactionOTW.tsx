
import * as React from 'react';
import CommonTransactionMap from '@fixit/template-transaction-map';
import { Region } from 'react-native-maps';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';
import { Status } from '@fixit/fixit-common-types/lib/domain/transaction';

interface Props{
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<any, { transaction: Transaction }>, any>;
};

type CustomerAddress = Transaction['detail']['customer_location']['address'];
type CustomerAddressMapper = {
  [key in Status]: CustomerAddress;
};



const getCustomerAddress = (transaction: Transaction)=>{
  const {status, detail:locationDetail} = transaction;
  const {value, detail} = locationDetail.customer_location.address;

  const customerAddressMapper:CustomerAddressMapper = {
    new:{value: '', detail: ''},
    onTheWay: {value, detail},
    onProgress: {value: 'Sedang Dalam Pengerjaan', detail: ''},
    finished: {value: 'Perbaikan Kendaraan Anda Telah Selesai', detail: 'silahkan melakukan konfirmasi'}
  };

  return customerAddressMapper[status];
}

const TransactionOTW = (props: Props) => {
    const { transaction } = props.route.params;
    const { detail } = props.route.params!.transaction;
    const { customer_location } = detail;
    const [mapData, setMapData] = React.useState<Region>({
      ...customer_location.map,
      latitudeDelta: 0,
      longitudeDelta:0
    });

    const {value: locationName, detail: locationDetail} = getCustomerAddress(transaction);
    const onSubmit = ()=>{
      props.navigation.goBack()
    }

    return (
    <CommonTransactionMap
        bottomButtonBarLabel='Tutup'
        locationName={locationName}
        locationNameDetail={locationDetail}
        mapData={mapData}
        navigation={props.navigation}
        serviceLocation={customer_location.map}
        onRegionChange={setMapData}
        onSubmit={onSubmit}
        transaction={transaction}
        routes={transaction.routes}
        showButtonTransactionDetail
    />
    );
};

export default TransactionOTW;
