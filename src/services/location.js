import axios from "axios";

// const baseUrl = "https://provinces.open-api.vn/api/";

// const getProvinces = () => {
//   return axios.get(baseUrl);
// };

// const getDistricts = (code) => {
//   return axios.get(`${baseUrl}p/${code}?depth=2`);
// };

// const getWards = (code) => {
//   return axios.get(`${baseUrl}d/${code}?depth=2`);
// };

const baseUrl = "https://online-gateway.ghn.vn";

const getProvinces = () => {
  return axios.get(`${baseUrl}/shiip/public-api/master-data/province`, {
    headers: { Token: process.env.REACT_APP_GHN_TOKEN },
  });
};

const getDistricts = (code) => {
  return axios.get(`${baseUrl}/shiip/public-api/master-data/district`, {
    headers: { Token: process.env.REACT_APP_GHN_TOKEN },
    params: { province_id: code },
  });
};

const getWards = (code) => {
  return axios.get(`${baseUrl}/shiip/public-api/master-data/ward`, {
    headers: { Token: process.env.REACT_APP_GHN_TOKEN },
    params: { district_id: code },
  });
};

const getDeliveryCharge = (districtID, wardID, weight) => {
  const fromDistrictID = Number(process.env.REACT_APP_GHN_FROM_DISTRICT_ID);
  return axios.get(`${baseUrl}/shiip/public-api/v2/shipping-order/fee`, {
    headers: { Token: process.env.REACT_APP_GHN_TOKEN },
    params: {
      from_district_id: fromDistrictID,
      service_id: 53320, // Standard
      service_type_id: 2,
      to_district_id: districtID,
      to_ward_code: wardID,
      weight,
    },
  });
};

export const locationService = {
  getProvinces,
  getDistricts,
  getWards,
  getDeliveryCharge,
};
