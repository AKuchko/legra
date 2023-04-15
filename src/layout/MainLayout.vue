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
export default {
  components: { MainSidebar, ViewWindow },
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
  padding: 0 50px;

  &__sidebar {
    position: sticky;
    top: 50px;
    left: 0;
    height: calc(100% - 100px);
    max-height: 20rem;
  }
}
</style>
