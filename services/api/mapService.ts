import {DetailMapResponse} from '@fixit/fixit-common-types/lib/response/map/detail'
import service from "../../config/services";


const detail = async (data: {
  latitude: string;
  longitude: string;
}): Promise<DetailMapResponse> => {
  const params = {latlng: data.latitude.concat(`,${data.longitude}`)};
  const res = await service.GoogleMaps.get('', {
    params,
  });

  return res.data;
};

const mapService = {
  detail,
};

export default mapService;
