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
        children: [
          {
            path: "post/:post_id",
            name: "comments",
            component: () => import("@/views/UserPost.vue"),
          },
        ],
      },
      {
        path: "/me",
        name: "me",
        component: () => import("@/views/MeView.vue"),
        children: [
          {
            path: "/post/:post_id",
            component: () => import("@/views/UserPost.vue"),
          },
        ],
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
