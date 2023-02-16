import AuthMiddleware from "./middleware/auth.middleware";
import fetchUser from "./middleware/fetchUser.middleware";

export default [
  {
    path: "/",
    component: () => import("@/layout/AuthLayout.vue"),
    redirect: "login",
    meta: {
      middleware: [AuthMiddleware.checkNonAuth],
    },
    children: [
      {
        path: "/login",
        name: "login",
        component: () => import("@/views/LoginView.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () => import("@/views/RegisterView.vue"),
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layout/MainLayout.vue"),
    meta: {
      middleware: [AuthMiddleware.checkAuth, fetchUser],
    },
    redirect: "main",
    children: [
      {
        path: "/main",
        name: "main",
        component: () => import("@/views/MainView.vue"),
      },
    ],
  },
];
