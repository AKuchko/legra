import client from "@/http/client";
import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "./storage.service";
import { getCookie, setCookie, removeCookie } from "./cookie.service";

const APP_TOKEN = "token";

class AuthService {
  _access = null;
  _refresh = null;

  get token() {
    return { access: this._access, refresh: this._refresh };
  }

  set token(token) {
    this._access = token.access;
    this._refresh = token.refresh;

    if (token.access) {
      setCookie(APP_TOKEN, token.access);
      setStorageItem(APP_TOKEN, token.refresh);
    } else {
      removeCookie(APP_TOKEN);
      removeStorageItem(APP_TOKEN);
    }
  }

  getAuthHeader() {
    return this.token.access ? `Bearer ${this.token.access}` : undefined;
  }

  hasAuthToken() {
    return !!this.token.access;
  }

  restoreAuthToken() {
    this.token = {
      access: getCookie(APP_TOKEN),
      refresh: getStorageItem(APP_TOKEN),
    };
  }

  login({ email = "", password = "" }) {
    return client.post("/api/auth/login", { email, password }).then((token) => {
      this.token = token.data;
    });
  }

  fetchUserInfo() {
    return client.get("/api/users/me");
  }

  register({ email, password }) {
    return client.post("/api/auth/reg", { email, password });
  }

  refreshToken({ refresh }) {
    return client.post("/api/auth/refresh", { refresh }).then((token) => {
      this.token = token.data;
    });
  }

  logout() {
    this.token = {
      access: null,
      refresh: null,
    };
  }
}

export default new AuthService();
