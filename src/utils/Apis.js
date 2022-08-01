export const BASE_URL = 'https://api-accumexs.codepointrs.com/api/';
export default {
  LOGIN: BASE_URL + '/Employee/Login',
  SETTINGS: BASE_URL + '/Settings/GetSettingsCache',
  UpdateStatus: BASE_URL + '/Status/SetStatus/',
  Lock: BASE_URL + '/Employee/UserLock',
  Unlock: BASE_URL + '/Employee/UserUnlock',
  LogOut: BASE_URL + '/Employee/LogOut',
  CheckUserStatus: BASE_URL + '/Employee/CheckUserStatus',
  RefreshToken: BASE_URL + '/Employee/refresh-token',
  GetDBCombo: BASE_URL + '/Employee/GetDBCombo',
}

export const ERROR_403 = "/403";
export const ERROR_404 = "/404";
export const ERROR_500 = "/500";
export const LOCK_PATH = "/auth/lock";
export const LOGIN_PATH = "/auth/login";
export const CONNECT_TO_SERVER = "CONNECT_TO_SERVER";
