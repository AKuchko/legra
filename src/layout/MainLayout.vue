<template>
  <div class="main">
    <main-sidebar class="main__sidebar" />
    <router-view />
  </div>
</template>

<script>
import MainSidebar from "@/components/MainSidebar.vue";
export default {
  components: { MainSidebar },
};
</script>

<style lang="scss">
.main {
  display: flex;
  max-width: 40rem;
  height: 100svh;
  margin: auto;
  padding: 50px;

  &__sidebar {
    position: fixed;
    top: 50px;
    left: 150px;
    height: calc(100% - 100px);
  }
}
</style>
