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
  console.log("request", request);
  store.dispatch(showLoader());

  return request;
};

const responseHandler = (response: any) => {
  console.log("response", response);
  store.dispatch(hideLoader());

  return response;
};

const errorHandler = (error: any) => {
  console.log("error", error);
  store.dispatch(hideLoader());
  throw error;
};

instance.interceptors.request.use(requestHandler);
instance.interceptors.response.use(responseHandler, errorHandler);

export default instance;
