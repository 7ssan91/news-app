import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";
import { setBaseUrl } from "./SetBaseUrl";
import i18n from "@app/../i18nextConf";
import LocalStorageManager from "@app/localStore/LocalStorageManger";
import { LocalStorageKeys } from "@app/lib/helpers/constants/helpers";
import { getLoginPageUrl } from "@app/routing/routingConstants/AppUrls";

const base = setBaseUrl();

export const apiGatewayService = axios.create({
  baseURL: base.gateway,
});

const requestInterceptor: any = (
  config: AxiosRequestConfig
): AxiosRequestConfig => {
  if (config.headers) {
    config.headers["lang"] = i18n.language;
    config.headers["Authorization"] = `Bearer ${LocalStorageManager.getItem(
      LocalStorageKeys.TOKEN
    )}`;
  }
  return config;
};

const requestInterceptorError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const responseInterceptorError = (error: AxiosError): Promise<AxiosError> => {
  if (error.response) {
    if (error.response.status === 401) {
      toast.error("401 Unauthorized");
      localStorage.removeItem(LocalStorageKeys.TOKEN);
      localStorage.removeItem(LocalStorageKeys.REFRESHTOKEN);
      window.location.href = getLoginPageUrl(i18n.language);
    }
  }
  return Promise.reject(error);
};

// Request interceptors
apiGatewayService.interceptors.request.use(
  requestInterceptor,
  requestInterceptorError
);

// Response interceptors
apiGatewayService.interceptors.response.use(
  responseInterceptor,
  responseInterceptorError
);
