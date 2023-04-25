<template>
  <div class="message" :class="{ 'message--me': isMymessage }">
    <router-link class="message__profile-image" :to="userLink">
      <base-profile-image :size="30" :imageData="props.message.profile_image" />
    </router-link>
    <div class="message__content">
      <p class="message__nickname">{{ props.message.user_name }}</p>
      <div v-if="props.message.message.media.length" class="message__media">
        <media-viewer :media="props.message.message.media" />
      </div>
      <p v-if="props.message.message.message_text" class="message__text">
        {{ props.message.message.message_text }}
      </p>
    </div>
  </div>
</template>

<script setup>
import BaseProfileImage from "./common/BaseProfileImage.vue";
import MediaViewer from "./MediaViewer.vue";
import { computed, defineProps } from "vue";
import { useStore } from "vuex";

const store = useStore();
const props = defineProps({
  message: Object,
});

const userInfo = computed(() => store.getters.userInfo);
const isMymessage = computed(
  () => userInfo.value.user_id === props.message.user_id
);
const userLink = computed(() => ({
  name: "user",
  params: { user_id: props.message.user_id },
}));
</script>

<style lang="scss">
.message {
  display: flex;
  font-size: $font-small;

  &__content {
    padding: 10px;
    border-radius: 18px;
    text-align: left;
    background: #ececec;
  }

  &__media {
    max-width: 20rem;
    overflow: hidden;
  }

  &__nickname {
    margin-bottom: 5px;
    font-size: $font-xsmall;
  }

  &__profile-image {
    margin: auto 10px 0 0;
  }

  &__text {
    margin: 10px 0;
  }
}

.message--me {
  flex-direction: row-reverse;

  .message__profile-image {
    margin: auto 0 0 10px;
  }

  .message__content {
    color: $color-light;
    background: $color-accent;
  }
}
</style>
