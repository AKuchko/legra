<script setup>
/* eslint-disable */
import BaseProfileImage from "./common/BaseProfileImage.vue";
import MediaViewer from "./MediaViewer.vue";
import MessageContextMenu from "./MessageContextMenu.vue";
import EmbededMessage from "./EmbededMessage.vue";
import messageService from "@/services/message.service";
import { computed, defineProps, defineEmits, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

// UTIL
const props = defineProps({ 
  message: Object, 
  privileges: String,
});
const emit = defineEmits([ "reply" ]);


// VARS
const message_ref = ref(null);
const store = useStore();
const contextMenuActivator = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });

// COMPUTED
const userInfo = computed(() => store.getters.userInfo);
const isMymessage = computed(() => userInfo.value.user_id === props.message.user_id);
const userLink = computed(() => ( { name: "user", params: { user_id: props.message.user_id } } ));

// FUNCTIONS
const onContextmenu = (event) => {
  if (message_ref.value.contains(event.target)) {
    event.preventDefault();
    contextMenuPosition.value.x = event.clientX;
    contextMenuPosition.value.y = event.clientY;
    document.querySelector(".message.context-show")?.classList.remove("context-show");
    message_ref.value.classList.add("context-show");
  }
}
const onCloseContextmenu = () => {
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
const delete_msg = () => {
  messageService.deleteMessage({ message_id: props.message.message_id, chat_id: props.message.chat_id });
}
const edit_msg = () => {
  window.dispatchEvent(new CustomEvent("edit-message", {
    detail: {
      message: props.message,
    }
  }));
}
const reply_msg = () => {
  window.dispatchEvent(new CustomEvent("reply-message", {
    detail: {
      message: props.message,
    }
  }));
}

// HOOKS
onMounted(() => {
  document.addEventListener("contextmenu", onContextmenu);
  document.addEventListener("click", onCloseContextmenu);
  const observer = new MutationObserver(observeCallback);
  observer.observe(message_ref.value, { 
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
    ref="message_ref"
    class="message"
    :class="{ 'message--me': isMymessage }"
    @dblclick="reply_msg"
  >
    <div class="message__content">
      <message-context-menu 
        :activator="contextMenuActivator" 
        :message_data="props.message" 
        :position="contextMenuPosition"
        :rights="props.privileges"
        @reply="reply_msg"
        @delete="delete_msg"
        @edit="edit_msg"
      />
      <router-link class="message__profile-image" :to="userLink">
        <base-profile-image
          :size="30"
          :imageData="props.message.profile_image"
        />
      </router-link>
      <div class="message__body">
        <p class="message__nickname">{{ props.message.user_name }}</p>
        <embeded-message v-if="props.message.embeded_message" :message="props.message.embeded_message" />
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
  position: relative;
  font-size: $font-small;
  margin-bottom: 0.5rem;

  &__content {
    display: flex;
  }

  &__body {
    padding: 0.5rem;
    border-radius: 0.8rem;
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

  &::before {
    content: "";
    display: none;
    position: absolute;
    top: -2.5%;
    right: 0;
    width: 100vw;
    height: 105%;
    transition: $transition-base;
    background: #000;
    opacity: 0;
  }
}

.message--me {
  color: $color-light;

  .message__content {
    flex-direction: row-reverse;
  }

  .message__profile-image {
    margin: auto 0 0 10px;
  }

  .message__body {
    background: $color-accent;
  }

  .embeded-message {
      &__msg-info p {
      color: $color-light;

      span {
        color: $color-light;
      }
    }

    &__body::before {
      background: $color-light;
    }
  }
}

.message.context-show::before {
  opacity: 0.1;
}
</style>
