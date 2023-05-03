<template>
  <div class="main">
    <main-sidebar class="main__sidebar" />
    <view-window class="main__window">
      <router-view />
    </view-window>
  </div>
</template>

<script>
import MainSidebar from "@/components/MainSidebar.vue";
import ViewWindow from "@/components/ViewWindow.vue";
import socket from "@/socket";

export default {
  components: { MainSidebar, ViewWindow },
  mounted() {
    socket.connect();
  },
};
</script>

<style lang="scss">
.main {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 100%;
  grid-column-gap: 10px;
  width: 100vw;
  height: 100vh;
  margin: auto;

  &__sidebar {
    padding: 2.5rem 1rem 2.5rem;
  }
}
</style>
