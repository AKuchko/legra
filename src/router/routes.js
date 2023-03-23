import AuthMiddleware from "./middleware/auth.middleware";
import fetchUser from "./middleware/fetchUser.middleware";
import fetchPosts from "./middleware/fetchUserPosts.middleware";

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
      middleware: [AuthMiddleware.checkAuth, fetchUser, fetchPosts],
    },
    redirect: "main",
    children: [
      {
        path: "main",
        name: "main",
        component: () => import("@/views/MainView.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/views/MeView.vue"),
      },
      {
        path: "messages",
        name: "messages",
        component: () => import("@/views/MessagesView.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/SettingsView.vue"),
      },
    ],
  },
];
