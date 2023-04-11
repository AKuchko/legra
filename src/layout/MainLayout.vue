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
  display: flex;
  max-width: 52rem;
  margin: auto;
  padding: 50px;

  &__sidebar {
    position: sticky;
    top: 50px;
    left: 0;
    height: calc(100% - 100px);
    max-height: 20rem;
    margin-right: 25px;
  }
}
</style>
