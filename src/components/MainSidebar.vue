<template>
  <BaseBlock class="sidebar">
    <router-link
      v-if="isUserStored"
      :to="{ name: 'user', params: { user_id: 1 } }"
      class="sidebar__profile"
    >
      <BaseProfileImage
        v-if="user.profile_image"
        class="sidebar__image"
        :size="40"
        :imageData="user.profile_image[0].data"
      />
      <h3 class="sidebar__username">{{ user.profile_name }}</h3>
    </router-link>
    <BasePreloader v-else />
    <ul class="sidebar__list">
      <li v-for="item in items" :key="item.id" class="sidebar__item">
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
import BasePreloader from "./common/BasePreloader.vue";
import { mapGetters } from "vuex";
import { Icon } from "@iconify/vue";

export default {
  name: "MainSidebar",
  components: { BaseBlock, BaseProfileImage, Icon, BasePreloader },
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
    ...mapGetters({
      user: "userInfo",
      isUserStored: "isUserStored",
    }),
  },
};
</script>

<style lang="scss">
.sidebar {
  min-height: 300px;
  max-width: 200px;
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
</style>
