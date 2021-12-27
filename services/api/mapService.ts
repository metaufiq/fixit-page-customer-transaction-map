import GoogleMapsApi from "../../config/services/services/GoogleMapsAPI";
import {DetailMapResponse} from '@fixit/fixit-common-types/lib/response/map/detail'


const detail = async (data: {
  latitude: string;
  longitude: string;
}): Promise<DetailMapResponse> => {
  const params = {latlng: data.latitude.concat(`,${data.longitude}`)};
  const res = await GoogleMapsApi.get('', {
    params,
  });

  return res.data;
};

const mapService = {
  detail,
};

export default mapService;
