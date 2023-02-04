import axios from "axios";
import { hideLoader, showLoader } from "../../store/common/reducers";
import config from "../../../config";

let store: any;

export const initializeStore = (initialStore: any) => {
  store = initialStore;
};

const instance = axios.create({
  baseURL: config.apiUrl,
});

const requestHandler = (request: any) => {
  store.dispatch(showLoader());

  return request;
};

const responseHandler = (response: any) => {
  store.dispatch(hideLoader());

  return response;
};

instance.interceptors.request.use(requestHandler);
instance.interceptors.response.use(responseHandler);

export default instance;
