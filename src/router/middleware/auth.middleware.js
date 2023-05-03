import authService from "@/services/auth.service";
import { LOGIN_ROUTE_NAME, MAIN_ROUTE_NAME } from "@/constants/routes";

const checkAuth = ({ next }) => {
  if (authService.hasAuthToken()) {
    return next();
  }
  return next({ name: LOGIN_ROUTE_NAME });
};

const checkNonAuth = ({ next }) => {
  if (authService.hasAuthToken()) return next({ name: MAIN_ROUTE_NAME });
  return next();
};

export default {
  checkAuth,
  checkNonAuth,
};
