import authService from "@/services/auth.service";
import router from "@/router";

const handleAuthError = (error) => {
  const status = error.response.status;
  const { refresh } = authService.token;

  if (status === 401) {
    authService
      .refreshToken({ refresh })
      .then(() => {
        router.push({ name: "main" });
      })
      .catch(() => {
        authService.logout();
        router.push({ name: "login" });
      });
  }

  return Promise.reject(error);
};

export { handleAuthError };
