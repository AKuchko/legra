<script>
/* eslint-disable */ 
import BaseBlock from "./common/BaseBlock.vue";
import BaseProfileImage from "./common/BaseProfileImage.vue";
import BasePreloader from "./common/BasePreloader.vue";
import TransitionSlide from "./transitions/TransitionSlide.vue";
import { mapGetters } from "vuex";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "MainSidebar",
  components: { BaseBlock, BaseProfileImage, Icon, BasePreloader, TransitionSlide },
  setup() {
    const store = useStore();
    const me = store.getters.userInfo;
    const sidebar_links =  ref([
      { name: "Main", link: { name: "main" }, icon: "mdi:home-variant" },
      { name: "Messanger", link: { name: "messages" }, icon: "ri:chat-3-fill" },
      { name: "Settings", link: { name: "settings" }, icon: "solar:settings-outline" },
    ]);
    const meLink = { name: 'user', params: { user_id: me.user_id } };

    return {
      sidebar_links,
      meLink,
      me,
    }
  },
};
</script>

<template>
  <BaseBlock class="sidebar">
    <transition-slide>
      <div class="sidebar__main">
        <router-link :to="meLink" class="sidebar__profile">
          <BaseProfileImage
            v-if="me.profile_image"
            class="sidebar__image"
            :size="40"
            :user_name="me.user_name"
            :imageData="me.profile_image"
          />
          <h3 class="sidebar__username">{{ me.profile_name }}</h3>
        </router-link>
        <ul class="sidebar__list">
          <li v-for="item in sidebar_links" :key="item.name" class="sidebar__item">
            <router-link :to="item.link" class="sidebar__link">
              {{ item.name }}
              <Icon :icon="item.icon" width="20" />
            </router-link>
          </li>
        </ul>
      </div>
    </transition-slide>
  </BaseBlock>
</template>

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
