<script>
/* eslint-disable */
import BaseProfileImage from "./common/BaseProfileImage.vue";
import MediaViewer from "./MediaViewer.vue";
import MessageContextMenu from "./MessageContextMenu.vue";
import EmbededMessage from "./EmbededMessage.vue";
import MsgPrivileges from "@/utils/MessagePrivileges.util";
import { computed, defineProps, nextTick, onMounted, onUnmounted, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "MessageTemplate",
  components: { BaseProfileImage, MediaViewer, MessageContextMenu, EmbededMessage },
  props: {
    message: Object, 
    userRole: String,
  },
  setup(props) {
    const store = useStore();
    const user_id = store.getters.userInfo.user_id;
    const message_ref = ref(null);
    const contextMenuActivator = ref(false);
    const contextMenuPosition = ref({ x: 0, y: 0 });
    const isMymessage = computed(() => user_id === props.message.from_id);
    const userLink = computed(() => ( { name: "user", params: { user_id: props.message.from_id } } ));
    const privileges = computed(() => {
      if (isMymessage.value) return MsgPrivileges.ownerPriviliges;
      if ((props.userRole === "admin") & !isMymessage.value) return MsgPrivileges.adminPrivileges;
      else if (props.userRole === "customer") return MsgPrivileges.customerPrivileges;
    })

    const onContextmenu = (event) => {
      if (!message_ref.value.contains(event.target)) return;
      event.preventDefault();
      contextMenuPosition.value.x = event.clientX;
      contextMenuPosition.value.y = event.clientY;
      document.querySelector(".message.context-show")?.classList.remove("context-show");
      message_ref.value.classList.add("context-show");
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
    const reply_msg = () => {
      window.dispatchEvent(
        new CustomEvent("reply-message", { detail: { target: props.message } })
      )
    }

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

    return {
      contextMenuActivator,
      contextMenuPosition,
      message_ref,
      isMymessage,
      privileges,
      userLink,
      reply_msg,
    }
  }
}
</script>

<template>
  <div
    :id="`message:${message.message_id}`"
    ref="message_ref"
    class="message"
    :class="{ 'message--me': isMymessage }"
    @dblclick="reply_msg"
  >
    <div class="message__content">
      <message-context-menu 
        :activator="contextMenuActivator" 
        :message_data="message" 
        :position="contextMenuPosition"
        :privileges="privileges"
      />
      <router-link class="message__profile-image" :to="userLink">
        <base-profile-image
          :size="30"
          :imageData="message.profile_image"
          :user_name="message.user_name"
        />
      </router-link>
      <div class="message__body">
        <p class="message__nickname">{{ message.user_name }}</p>
        <embeded-message v-if="message.embeded_message" :message="message.embeded_message" />
        <div v-if="message.media.length" class="message__media">
          <media-viewer :media="message.media" />
        </div>
        <p v-if="message.message" class="message__text">
          {{ message.message }}
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
