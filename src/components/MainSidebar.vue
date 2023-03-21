<template>
  <BaseBlock class="sidebar">
    <a href="#/user" class="sidebar__profile">
      <BaseProfileImage
        class="sidebar__image"
        :size="40"
        :imageData="userInfo.profile_image"
      />
      <h3 class="sidebar__username">@{{ userInfo.username }}</h3>
    </a>
    <ul class="sidebar__list">
      <li class="sidebar__item" v-for="item in items" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </BaseBlock>
</template>

<script>
import BaseBlock from "./common/BaseBlock.vue";
import BaseProfileImage from "./common/BaseProfileImage.vue";
import { mapGetters } from "vuex";

export default {
  name: "MainSidebar",
  components: { BaseBlock, BaseProfileImage },
  props: {
    items: {
      type: Array,
      default: () => [
        { id: 1, name: "Main" },
        { id: 2, name: "Messages" },
        { id: 3, name: "Settings" },
      ],
    },
  },
  computed: mapGetters(["userInfo"]),
};
</script>

<style lang="scss">
.sidebar {
  min-height: 300px;
  max-width: 200px;
  margin-right: 25px;
  padding: 40px 25px;
  transition: $transition-base;

  &__profile {
    display: block;
    margin-bottom: 25px;
  }

  &__image {
    margin: auto;
  }
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
