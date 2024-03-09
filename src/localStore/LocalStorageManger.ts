// constants
import { decryptData, encryptData } from "../lib/helpers/constants/helpers";

class LocalStorageManager {
  static setItem(key: string, data: any): void {
    const encryptedValue = encryptData(data);
    localStorage.setItem(key, encryptedValue);
  }

  static getItem(key: string): any {
    const value: any = localStorage.getItem(key);
    try {
      return decryptData(value);
    } catch (e) {
      return value;
    }
  }

  static removeItem(key: string): any {
    const value = this.getItem(key);
    localStorage.removeItem(key);
    return value;
  }

  static clear(): void {
    localStorage.clear();
  }
}

export default LocalStorageManager;
