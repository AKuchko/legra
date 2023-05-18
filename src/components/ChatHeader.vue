<script>
import BackButton from "./buttons/BackButton.vue";
import BaseProfileImage from "./common/BaseProfileImage.vue";
import { useRouter } from "vue-router";
export default {
  name: "ChatHeader",
  components: { BackButton, BaseProfileImage },
  props: {
    chatName: { type: String },
    chatImage: { type: Array, default: () => [] },
  },
  setup() {
    const route = useRouter();
    const goBack = () => route.go(-1);
    return { goBack };
  },
};
</script>

<template>
  <div class="chat-header">
    <div class="chat-header__wrapper secondary">
      <BackButton @click="goBack" />
      <div class="chat-header__info">
        <BaseProfileImage
          :imageData="chatImage"
          :user_name="chatName"
          :size="40"
        />
        <p class="chat-header__name">{{ chatName }}</p>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style lang="scss">
.chat-header {
  width: 100%;

  &__wrapper {
    margin: auto;
    width: calc(100% - 25vw);
    max-width: 45rem;
    display: flex;
    align-items: center;
    padding: 0.25rem;
    border-radius: 0 0 0.5rem 0.5rem;
  }

  &__info {
    display: flex;
    align-items: center;
    margin-left: 0.8rem;
  }

  &__name {
    margin-left: 0.8rem;
  }
}
</style>
