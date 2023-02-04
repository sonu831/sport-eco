import axios from "axios";
import { hideLoader, showLoader } from "../../store/common/reducers";

let store: any;

export const initializeStore = (initialStore: any) => {
  store = initialStore;
};

const instance = axios.create({
  baseURL: "https://5202-2401-4900-1c5e-9bc5-60e8-490c-ad8c-be8f.ngrok.io",
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
