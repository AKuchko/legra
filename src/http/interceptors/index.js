import { handleAuthError } from "./auth.interceptor";
import { addResponseInterceptor } from "../client";

const initInterceptors = () => {
  addResponseInterceptor({ errorInterceptor: handleAuthError });
};

export default initInterceptors;
