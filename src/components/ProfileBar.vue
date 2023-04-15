<template>
  <BaseBlock class="profile-bar">
    <BaseProfileImage
      :size="75"
      :imageData="user.profile_image"
      class="profile-bar__image"
    />
    <div class="profile-bar__info">
      <h3 class="profile-bar__username">
        @{{ user.user_name }}
        <Icon icon="mdi:pencil" />
      </h3>
      <p class="profile-bar__usernote">
        {{ user.user_description }}
      </p>
    </div>
    <slot></slot>
  </BaseBlock>
</template>

<script>
/* eslint-disable */ 
import BaseProfileImage from "./common/BaseProfileImage.vue";
import BaseBlock from "./common/BaseBlock.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "ProfileBar",
  components: { BaseProfileImage, BaseBlock, Icon },
  props: {
    user: { type: Object }
  },
};
</script>

<style lang="scss">
.profile-bar {
  display: flex;
  align-items: center;
  height: auto;
  padding: 25px;
  text-align: left;

  &__image {
    flex-shrink: 0;
    margin-right: 25px;
  }

  &__username {
    font-weight: 700;
    margin-bottom: 10px;
  }

  &__usernote {
    font-size: $font-small;
  }
}
</style>
