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
        <a :href="item.link" class="sidebar__link">
          {{ item.name }}
          <Icon :icon="item.icon" :inline="true" width="20" height="20" />
        </a>
      </li>
    </ul>
  </BaseBlock>
</template>

<script>
import BaseBlock from "./common/BaseBlock.vue";
import BaseProfileImage from "./common/BaseProfileImage.vue";
import { mapGetters } from "vuex";
import { Icon } from "@iconify/vue";

export default {
  name: "MainSidebar",
  components: { BaseBlock, BaseProfileImage, Icon },
  props: {
    items: {
      type: Array,
      default: () => [
        { id: 1, name: "Main", link: "#/main", icon: "mdi:home-variant" },
        { id: 2, name: "Messages", link: "#/messages", icon: "ri:chat-3-fill" },
        {
          id: 3,
          name: "Settings",
          link: "#/settings",
          icon: "ri:settings-4-fill",
        },
      ],
    },
  },
  computed: {
    ...mapGetters(["userInfo", "isUserStored"]),
  },
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
    position: relative;
    display: block;
    margin-bottom: 25px;

    &::after {
      content: "";
      position: absolute;
      bottom: -12.5px;
      left: 0;
      width: 100%;
      height: 1px;
      background: $color-placeholder;
    }
  }

  &__image {
    margin: auto;
  }

  &__item {
    margin-bottom: 10px;
    text-align: left;
    transition: $transition-base;

    &:hover {
      border-radius: 8px;
      background: rgba($color: $color-placeholder, $alpha: 0.5);
    }
  }

  &__link {
    padding: 8px 10px;
    display: block;
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
