import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getHomePageUrl } from "@app/routing/routingConstants/AppUrls";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
//api
import AuthService from "@app/services/AuthService";
import { LocalStorageKeys } from "@app/lib/helpers/constants/helpers";
import LocalStorageManager from "@app/localStore/LocalStorageManger";
import i18n from "@app/../i18nextConf";

interface AuthState {
  decodedToken: any;
  refreshToken: string;
  isLoading: boolean;
}

interface LoginUserPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  decodedToken: LocalStorageManager.getItem(LocalStorageKeys.TOKEN)
    ? jwtDecode(LocalStorageManager.getItem(LocalStorageKeys.TOKEN))
    : "",
  refreshToken:
    LocalStorageManager.getItem(LocalStorageKeys.REFRESHTOKEN) || "",
  isLoading: false,
};

export const setLoginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginUserPayload) => {
    const bodyData = {
      email,
      password,
      accountType: 2,
    };
    try {
      const res = await AuthService.getLoginUser(bodyData);
      toast.success("Logged in successfully");
      return res.data;
    } catch (err: any) {
      toast.error(err?.response?.data?.message ?? "Failed to login");
      throw err;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setLoginUser.fulfilled, (state, action) => {
        LocalStorageManager.setItem(
          LocalStorageKeys.TOKEN,
          action.payload.accessToken
        );
        LocalStorageManager.setItem(
          LocalStorageKeys.REFRESHTOKEN,
          action.payload.refreshToken
        );
        window.location.href = getHomePageUrl(i18n.language);
        state.isLoading = false;
      })
      .addCase(setLoginUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
