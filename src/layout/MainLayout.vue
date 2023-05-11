<template>
  <div class="main">
    <main-sidebar class="main__sidebar" />
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <view-window class="main__window">
            <Component :is="Component" />
          </view-window>
        </template>
        <template #fallback>
          <h1>loading...</h1>
        </template>
      </suspense>
    </router-view>
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
}
</style>
