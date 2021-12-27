import { DetailMapResponse } from '@fixit/fixit-common-types/lib/response/map/detail';
declare const mapService: {
    detail: (data: {
        latitude: string;
        longitude: string;
    }) => Promise<DetailMapResponse>;
};
export default mapService;
