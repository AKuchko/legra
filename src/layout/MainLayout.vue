<template>
  <div class="main bg">
    <transition name="sidebar">
      <main-sidebar class="main__sidebar secondary" />
    </transition>
    <router-view v-slot="{ Component }">
      <suspense timeout="0">
        <template #default>
          <view-window class="main__window">
            <TransitionSlide>
              <Component :is="Component" />
            </TransitionSlide>
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
import TransitionSlide from "@/components/transitions/TransitionSlide.vue";
import socket from "@/socket";

export default {
  components: { MainSidebar, ViewWindow, TransitionSlide },
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
.sidebar-enter-active,
.sidebar-leave-active {
  transition: all 0.2s ease-in-out;
}

.sidebar-enter-from,
.sidebar-leave-to {
  position: absolute;
  top: 0;
  opacity: 0;
  transform: translate(-100%, 0) scale(0.9);
}
</style>
