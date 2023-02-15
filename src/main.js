import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import authService from "./services/auth.service";

authService.restoreAuthToken();

const app = createApp(App);
app.use(router);
app.use(store);
app.mount("#app");
