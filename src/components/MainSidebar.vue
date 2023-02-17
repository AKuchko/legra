<template>
  <BaseBlock class="sidebar">
    <div class="sidebar__profile">
      <img src="#" alt="profile image" class="sidebar__user-image" />
      <h3 class="sidebar__username">@{{ userInfo.username }}</h3>
    </div>
    <ul class="sidebar__list">
      <li class="sidebar__item" v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </BaseBlock>
</template>

<script>
import BaseBlock from "./common/BaseBlock.vue";
import { mapGetters } from "vuex";

export default {
  name: "MainSidebar",
  components: { BaseBlock },
  props: {
    items: {
      type: Array,
      default: () => [{ id: 1, name: "One" }],
    },
  },
  computed: mapGetters(["userInfo"]),
};
</script>

<style lang="scss">
.sidebar {
  min-height: 300px;
  max-width: 200px;
  padding: 40px 25px;
  transition: $transition-base;
}

@media (max-width: 600px) {
  .sidebar {
    display: flex;
    min-height: auto;
    max-width: none;
    width: 100%;
    height: 50px;
    position: fixed;
    bottom: 0;
    left: 0;
  }
}
</style>
