
import * as React from 'react';
import { Alert, PermissionsAndroid } from 'react-native';
import CommonTransactionMap from '@fixit/template-transaction-map';
import { LatLng } from 'react-native-maps';
import { useForm } from 'react-hook-form';
import Geolocation from '@react-native-community/geolocation';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import Transaction from '../config/types/domain/transaction';

import mapService from '../services/api/mapService';
import { AxiosError } from 'axios';

interface mainProps{
  navigation: NavigationProp<any, any>;
  route: RouteProp<Record<any, { transaction: Transaction }>, any>;
};
const TransactionMap = (props: mainProps) => {
  let currentTransaction = props.route.params!.transaction;

  const [mapData, setMapData] = React.useState<any>();
  const [serviceLocation, setServiceLocation] = React.useState<LatLng>({
    latitude:0,
    longitude:0
  });

  const [locationName, setLocationName] = React.useState('Lokasi');
  const [locationNameDetail, setLocationNameDetail] = React.useState('Lokasi');

  const getLocationInformation = async (
    latitude: number,
    longitude: number,
  ) => {
    try {
      const res = await mapService.detail({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
      });

      if (res?.results.length === 0) {
        return;
      }
      setLocationName(
        `${res?.results[0]?.address_components[1]?.short_name}, ${res?.results[0]?.address_components[0]?.short_name}`,
      );
      setLocationNameDetail(
        res?.results[0]?.formatted_address ?? 'Lokasi',
      );
    } catch (error){
      const errorData = error as AxiosError;
      Alert.alert(
        'Oops,There Is Some Error',
        errorData?.response?.data ?? errorData?.message,
      );
    }
  };

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'MyMapApp needs access to your location',
          buttonPositive: 'ok',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getInnitialMapData = React.useCallback(async () => {
    Geolocation.getCurrentPosition(
      async position => {
        setMapData({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0,
          longitudeDelta: 0,
        });
        setServiceLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        await getLocationInformation(
          position.coords.latitude,
          position.coords.longitude,
        );
      },
      (e: any) => {
        Alert.alert('gagal', JSON.stringify(e));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 10000,
      },
    );
  }, []);

  React.useEffect(() => {
    getInnitialMapData();
  }, [getInnitialMapData]);

  React.useEffect(() => {
    if (!serviceLocation) {
      return;
    }
    getLocationInformation(
      serviceLocation!.latitude,
      serviceLocation!.longitude,
    );
  }, [serviceLocation]);

  React.useEffect(() => {
    requestLocationPermission();
  }, []);
  const formData = useForm<Transaction['detail']['customer_location']>();
  const onSubmit = (data: Transaction['detail']['customer_location']) => {
    currentTransaction.detail.customer_location.additional_information =
      data.additional_information;
    currentTransaction.detail.customer_location.map = serviceLocation;
    currentTransaction.detail.customer_location.address.value = locationName;
    currentTransaction.detail.customer_location.address.detail =
      locationNameDetail;
    props.navigation.navigate('WorkerList', {transaction: currentTransaction});
  };

  const handleSubmit = formData.handleSubmit(onSubmit);

  return (
    <CommonTransactionMap
      control={formData.control}
      bottomButtonBarLabel='Lanjutkan'
      locationName=''
      locationNameDetail=''
      mapData={mapData}
      navigation={props.navigation}
      serviceLocation={serviceLocation}
      onRegionChange={setMapData}
      onSubmit={handleSubmit}
      transaction={currentTransaction}
      routes={currentTransaction.routes}
    />
  );
};

export default TransactionMap;
