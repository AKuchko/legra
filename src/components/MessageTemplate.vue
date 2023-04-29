<script setup>
/* eslint-disable */
import BaseProfileImage from "./common/BaseProfileImage.vue";
import MediaViewer from "./MediaViewer.vue";
import MessageContextMenu from "./MessageContextMenu.vue";
import { computed, defineProps, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

const message = ref(null);
const store = useStore();
const props = defineProps({ message: Object });

const userInfo = computed(() => store.getters.userInfo);
const isMymessage = computed(() => userInfo.value.user_id === props.message.user_id);
const userLink = computed(() => ( { name: "user", params: { user_id: props.message.user_id } } ));
const contextMenuActivator = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });

const onContextmenu = (event) => {
  if (message.value.contains(event.target)) {
    event.preventDefault();
    // document.querySelector('body').classList.add('no-scroll');
    contextMenuPosition.value.x = event.clientX;
    contextMenuPosition.value.y = event.clientY;
    document.querySelector(".message.context-show")?.classList.remove("context-show");
    message.value.classList.add("context-show");
  }
}
const onCloseContextmenu = () => {
  // document.querySelector('body').classList.remove('no-scroll'); Сделать scrollable-element и scrollable-element--no-scroll
  document.querySelector(".message.context-show")?.classList.remove("context-show");
}
const observeCallback = (mutations) => {
  for (const m of mutations) {
    const newValue = m.target.getAttribute(m.attributeName);
    nextTick(() => {
      const classList = newValue.split(" ");
      contextMenuActivator.value = classList.includes("context-show");
    })
  }
};

onMounted(() => {
  document.addEventListener("contextmenu", onContextmenu);
  document.addEventListener("click", onCloseContextmenu);
  const observer = new MutationObserver(observeCallback);
  observer.observe(message.value, { 
    attributes: true,
    attributeOldValue : false,
    attributeFilter: ['class'], 
  });
});
onUnmounted(() => {
  document.removeEventListener("contextmenu", onContextmenu);
  document.removeEventListener("click", onCloseContextmenu);
});
</script>

<template>
  <div
    :id="`message:${props.message.message_id}`"
    ref="message"
    class="message"
    :class="{ 'message--me': isMymessage }"
  >
    <div class="message__content">
      <message-context-menu 
        :activator="contextMenuActivator" 
        :message_data="props.message" 
        :position="contextMenuPosition" 
      />
      <router-link class="message__profile-image" :to="userLink">
        <base-profile-image
          :size="30"
          :imageData="props.message.profile_image"
        />
      </router-link>
      <div class="message__body">
        <p class="message__nickname">{{ props.message.user_name }}</p>
        <div v-if="props.message.media.length" class="message__media">
          <media-viewer :media="props.message.media" />
        </div>
        <p v-if="props.message.message_text" class="message__text">
          {{ props.message.message_text }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.message {
  font-size: $font-small;
  margin-bottom: 1rem;

  &__content {
    display: flex;
  }

  &__body {
    padding: 10px;
    border-radius: 18px;
    text-align: left;
    background: $color-light-bg;
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
  .message__content {
    flex-direction: row-reverse;
  }

  .message__profile-image {
    margin: auto 0 0 10px;
  }

  .message__body {
    color: $color-light;
    background: $color-accent;
  }
}
</style>
