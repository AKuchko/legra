<template>
  <div class="main">
    <div class="main__wrapper">
      <main-sidebar />
      <router-view />
    </div>
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
  width: 100vw;
  height: 100vh;

  &__wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    max-width: 51rem;
    margin: 0 auto;
    padding: 100px 25px;
  }
}
</style>
