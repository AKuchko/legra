import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import authService from "./services/auth.service";
import initInterceptors from "./http/interceptors";

authService.restoreAuthToken(); // init auth token from local cookies
initInterceptors(); // init interceptors

const app = createApp(App);

app.use(router);
app.use(store);
app.mount("#app");
