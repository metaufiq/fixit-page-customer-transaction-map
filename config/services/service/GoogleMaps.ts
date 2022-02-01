import axios from 'axios';

const GoogleMaps= axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode',
});

export default GoogleMaps;
