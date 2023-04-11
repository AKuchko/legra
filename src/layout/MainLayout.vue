<template>
  <div class="main">
    <main-sidebar class="main__sidebar" />
    <router-view v-slot="{ Component }">
      <FadeTransition>
        <component :is="Component" />
      </FadeTransition>
    </router-view>
  </div>
</template>

<script>
import MainSidebar from "@/components/MainSidebar.vue";
import FadeTransition from "@/components/FadeTransition.vue";
export default {
  components: { MainSidebar, FadeTransition },
};
</script>

<style lang="scss">
.main {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 100%;
  grid-column-gap: 10px;
  width: 100vw;
  height: 100svh;
  overflow: hidden;
  padding: 50px;

  &__sidebar {
    position: sticky;
    top: 50px;
    left: 0;
    height: calc(100% - 100px);
    max-height: 20rem;
  }
}
</style>
