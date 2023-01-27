import client from "@/http/client";

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
      // Save token in cookie ???
    }
  }

  getAuthHeader() {
    return this.token.access ? `Bearer ${this.token.access}` : undefined;
  }

  hasAuthToken() {
    return !!this.token.access;
  }

  removeAuthToken() {
    this.token = {
      access: null,
      refresh: null,
    };
  }

  login({ email = "", password = "" }) {
    return client.post("/api/auth/login", { email, password }).then((token) => {
      this.token = token;
    });
  }

  register({ email, password }) {
    return client.post("/api/auth/reg", { email, password });
  }

  logout() {
    this.removeAuthToken();
  }
}

export default new AuthService();
