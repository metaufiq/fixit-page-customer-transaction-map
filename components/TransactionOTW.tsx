
import * as React from 'react';
import { Alert } from 'react-native';
import CommonTransactionMap from '@fixit/template-transaction-map';
import { Region } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';

interface Props{
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<any, { transaction: Transaction }>, any>;
};
const TransactionOTW = (props: Props) => {
    const { transaction } = props.route.params;
    const { detail } = props.route.params!.transaction;
    const { customer_location } = detail;
    const [mapData, setMapData] = React.useState<Region>({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
    });
    
    const getInnitialMapData = React.useCallback(async () => {
        Geolocation.getCurrentPosition(
          async position => {
            setMapData({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0,
              longitudeDelta: 0,
            });
          },
          (e: any) => {
            Alert.alert('Gagal', 'Periksa Kembali Jaringan dan Akses Lokasi Kamu');
          },
          {
            enableHighAccuracy: false,
            timeout: 50000,
            maximumAge: 10000,
          },
        );
      }, []);
    
    React.useEffect(() => {
        getInnitialMapData();
    }, [getInnitialMapData]);

    const onSubmit = ()=>{
      props.navigation.goBack()
    }
    return (
    <CommonTransactionMap
        bottomButtonBarLabel='Tutup'
        locationName={detail.customer_location.address.value }
        locationNameDetail={customer_location.address.detail}
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
