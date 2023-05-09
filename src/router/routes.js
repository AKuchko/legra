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
        path: "main",
        name: "main",
        component: () => import("@/views/MainView.vue"),
      },
      {
        path: "user/:user_id",
        name: "user",
        component: () => import("@/views/UserView.vue"),
      },
      {
        path: "coomments/:post_id",
        name: "comments",
        component: () => import("@/views/CommentsView.vue"),
      },
      {
        path: "messages",
        name: "messages",
        component: () => import("@/views/MessangerView.vue"),
      },
      {
        path: "settings",
        name: "settings",
        component: () => import("@/views/SettingsView.vue"),
      },
      {
        path: "chat/:user_id",
        name: "chat",
        component: () => import("@/views/ChatView.vue"),
      },
    ],
  },
];
