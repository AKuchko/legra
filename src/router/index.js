import { createRouter, createWebHashHistory } from "vue-router";
import routes from "./routes";
import store from "@/store";
import createMiddlewarePipeline from "./middlewarePipeline";

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  // scrollBehavior(to, from, savedPosition) {
  //   return savedPosition || { top: 0 };
  // },
});

router.beforeEach((to, from, next) => {
  const middleware = to.meta.middleware;

  if (!middleware[0]) {
    next();
    return;
  }

  const context = { to, from, next, store };
  createMiddlewarePipeline(context, middleware)();
});

export default router;
