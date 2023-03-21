<template>
  <div class="main">
    <main-sidebar />
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
  max-width: 51rem;
  height: 100vh;
  margin: auto;
  padding: 50px;
}
</style>
