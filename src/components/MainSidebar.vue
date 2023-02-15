<template>
  <BaseBlock class="sidebar">
    <ul class="sidebar__list">
      <li class="sidebar__item" v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </BaseBlock>
</template>

<script>
import BaseBlock from "./common/BaseBlock.vue";
import client from "@/http/client";
export default {
  name: "MainSidebar",
  components: { BaseBlock },
  props: {
    items: {
      type: Array,
      default: () => [{ id: 1, name: "One" }],
    },
  },
  mounted() {
    client.get("/users/me");
  },
};
</script>

<style lang="scss">
.sidebar {
  max-width: 200px;
  padding: 40px 25px;
  transition: $transition-base;
}
</style>
