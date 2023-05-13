<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import authService from "./services/auth.service";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  window.addEventListener("logout", () => {
    authService.logout();
    router.push({ name: "login" });
  });
});
</script>

<style lang="scss">
#app {
  font-size: $font-base;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $color-dark;
  height: 100%;
}
</style>
