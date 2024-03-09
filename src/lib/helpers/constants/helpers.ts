import CryptoJS from "crypto-js";
import LocalStorageManager from "@app/localStore/LocalStorageManger";

const secretKey = "kibreet_app";

export const LocalStorageKeys = {
  TOKEN: "token",
  REFRESHTOKEN: "refresh-token",
};

export const isAuthenticated = (): boolean =>
  !!LocalStorageManager.getItem(LocalStorageKeys.TOKEN);

export const encryptData = (data: any): string => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
};

export const decryptData = (data: string): any => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const convertQueryParamsIntoObject = (params: string): object =>
  JSON.parse(
    '{"' +
      decodeURIComponent(
        params.substring(1).replace(/&/g, '","').replace(/=/g, '":"')
      ) +
      '"}'
  );

export const convertObjectIntoQueryParams = (object: any): string =>
  "?" +
  Object.keys(object)
    .map((key: any) => {
      const filteredEncodedstring =
        object[key] && typeof object[key] === "string"
          ? object[key].replace(/[\\]*["]*[?]*[<]*[>]*[|]*[\t]*/gi, "")
          : object[key];
      return `${key}=${encodeURIComponent(filteredEncodedstring)}`;
    })
    .join("&");