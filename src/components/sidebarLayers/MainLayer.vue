<script>
/* eslint-disable */ 
import BaseProfileImage from "../common/BaseProfileImage.vue";
import { Icon } from "@iconify/vue";
import { ref, computed } from "vue";
import { useStore } from "vuex";
import SettingsLayer from "./SettingsLayer.vue";
import SearchLayer from "./SearchLayer.vue";

export default {
  name: "MainOver",
  components: { BaseProfileImage, Icon },
  setup() {
    const store = useStore();
    const me = computed(() => store.getters.userInfo);
    const mainLink = { name: "main" };
    const messangerLink = { name: "messages" };
    const meLink = { name: 'user', params: { user_id: me.value.user_id } };

    const openSettings = () => {
      store.dispatch("toggleComponent", { component: SettingsLayer });
    };
    const openSearch = () => {
      store.dispatch("toggleComponent", { component: SearchLayer });
    }

    return {
      meLink,
      mainLink,
      messangerLink,
      me,
      openSettings,
      openSearch,
    }
  },
};
</script>

<template>
  <div class="main-sidebar">
    <div class="main-sidebar__header">
      <router-link :to="meLink" class="main-sidebar__profile">
        <BaseProfileImage
          class="main-sidebar__image"
          :user_name="me.user_name"
          :imageData="me.profile_image"
        />
        <h3 class="main-sidebar__username">{{ me.profile_name }}</h3>
      </router-link>
    </div>
    <div class="main-sidebar__body">
      <nav class="main-sidebar__nav">
        <ul class="main-sidebar__list">
          <li class="main-sidebar__item">
            <router-link :to="mainLink" class="main-sidebar__link">
              Main
              <Icon icon="ion:home" width="20" />
            </router-link>
          </li>
          <li class="main-sidebar__item">
            <router-link :to="messangerLink" class="main-sidebar__link">
              Messanger
              <Icon icon="ion:chatbubble" width="20" />
            </router-link>
          </li>   
          <li class="main-sidebar__item">
            <button @click="openSearch" class="main-sidebar__link">
              Search
              <Icon icon="ion:search" width="20" />
            </button>
          </li>
          <li class="main-sidebar__item">
            <button @click="openSettings" class="main-sidebar__link">
              Settings
              <Icon icon="ion:settings-sharp" width="20" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style lang="scss">
.main-sidebar {
  height: 100%;
  width: 100%;
  min-width: 10rem;
  transition: $transition-base;

  &__header {
    position: relative;
    padding: 0.375rem 0.8rem;
    height: 5rem;
    overflow: hidden;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background: $color-placeholder;
    }
  } 

  &__profile {
    display: block;
    border-radius: 0.5rem;
    transition: $transition-base;

    &:hover {
      background: rgba($color: $color-placeholder, $alpha: 0.5);
    }
  }

  &__username {
    overflow: hidden;
    text-overflow: ellipsis;
    width: 8rem;
    margin: auto;
  }

  &__body {
    height: 100%;
    padding: 0.375rem 0.8rem;
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
