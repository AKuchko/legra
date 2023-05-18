<script>
/* eslint-disable */
import BaseFiledropper from "./common/BaseFiledropper.vue";
import BaseFilepicker from "./common/BaseFilepicker.vue";
import EmbededMessage from "./EmbededMessage.vue";
import FilesViewer from "./FilesViewer.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { Icon } from "@iconify/vue";

export default {
  name: "MessageInputBox",
  emits: ["send-message"],
  components: { BaseFiledropper, BaseFilepicker, EmbededMessage, FilesViewer, Icon },
  setup(props, { emit }) {
    const message_text = ref("");
    const message_input = ref(null);
    const sendButton = ref(null);
    const files = ref([]);
    const embededMessage = ref(null);
    const embededIcon = ref("");
    let messageType = "message";

    const updatemMessageText = (e) => (message_text.value = e.target.innerText);
    const sendOnEnter = (e) => (sendButton.value.click());
    const removeMedia = (_id) => (files.value = files.value.filter((_file) => _file.id != _id));
    const addMedia = ({_files}) => {
      for (let i = 0; i < _files.length; i++) 
        files.value.push(_files[i]);
    };
    const clearData = () => {
      message_text.value = "";
      files.value = [];
      message_input.value.innerText = "";
    }
    const clearEmbeded = () => {
      embededMessage.value = null;
      embededIcon.value = "";
      messageType = "message";
    };
    const sendMessage = () => {
      const media = new DataTransfer();
      for (let i = 0; i < files.value.length; i++) {
        media.items.add(files.value[i].file);
      }
      emit("send-message", {
        message: message_text.value,
        media,
        embeded_message: embededMessage.value,
        type: messageType,
      });
      clearEmbeded();
      clearData();
    }; 

    const onReply = (e) => {
      embededMessage.value = e.detail.target;
      embededIcon.value = "quill:reply";
      messageType = "reply";
      message_input.value.focus();
    }
    const onEdit = (e) => {
      embededMessage.value = e.detail.target;
      embededIcon.value = "material-symbols:edit-rounded";
      messageType = "edit";
      message_text.value = embededMessage.value.message;
      message_input.value.innerText = message_text.value;
      message_input.value.focus();
    }
    // const onForward = (e) => {
    //   console.log(e);
    // }

    onMounted(() => {
      window.addEventListener("reply-message", onReply);
      window.addEventListener("edit-message", onEdit);
      // window.addEventListener("forward-message", onForward);
    });
    onUnmounted(() => {
      window.removeEventListener("reply-message", onReply);
      window.removeEventListener("edit-message", onEdit);
      // window.removeEventListener("forward-message", onForward);
    });

    return {
      message_input,
      message_text,
      sendButton,
      files,
      embededMessage,
      embededIcon,
      sendOnEnter,
      sendMessage,
      updatemMessageText,
      addMedia,
      removeMedia,
      clearEmbeded,
    };
  }
}
</script>

<template>
  <base-filedropper @file-drop="addMedia" />
  <div class="message-input-box">
    <div class="message-input-box__compose secondary">
      <embeded-message v-if="embededMessage" :message="embededMessage">
        <template #icon>
          <i class="icon">
            <Icon :icon="embededIcon" width="24" />
          </i>
        </template>
        <template #footer>
          <button  class="cancel-button" @click="clearEmbeded">
            <Icon icon="material-symbols:close-rounded" width="24" />
          </button>
        </template>
      </embeded-message>
      <div v-if="files.length" class="message-input-box__files">
        <files-viewer :images="files" @delete="removeMedia" />
      </div>
      <div class="message-input-box__input-wrapper">
        <div class="message-input-box__input-scroller">
          <div
            id="editable-message-input"
            ref="message_input"
            class="message-input-box__message-text"
            contenteditable="true"
            @input="updatemMessageText"
            @keydown.enter.exact.prevent="sendOnEnter"
            dir="auto"
          ></div>
          <span v-show="!message_text" class="message-input-box__input-placeholder">Message</span>
        </div>
        <div class="message-input-box__attach-button">
          <base-filepicker @file-select="addMedia">
            <Icon icon="ph:paperclip-light" width="20" />
          </base-filepicker>
        </div>
      </div>
    </div>
    <button
      ref="sendButton"
      class="message-input-box__button secondary"
      @click="sendMessage"
    >
      <Icon icon="ion:ios-send" width="25" />
    </button>
  </div>
</template>

<style lang="scss">
[contenteditable] {
  outline: 0px solid transparent;
}

.message-input-box {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 0.8rem;

  &__compose {
    flex-grow: 1;
    border-radius: 8px;
  }

  &__input-wrapper {
    display: flex;
  }

  &__input-scroller {
    position: relative;
    flex-grow: 1;
    max-height: 15rem;
    font-size: 0.8rem;
    line-height: 1rem;
    overflow-y: scroll;
    transition: height 100ms ease;
  }

  &__message-text {
    display: block;
    width: 100%;
    height: auto;
    padding: 1rem 0;
    padding-right: 0;
    padding-left: 0.75rem;
    white-space: pre-wrap;
    outline: none;
    word-break: break-word;
    overflow: hidden;
    text-align: initial;
    color: $color-dark;

    @media (prefers-color-scheme: dark) {
      color: $color-light;
    }
  }

  &__input-placeholder {
    position: absolute;
    left: 0.75rem;
    top: 1rem;
    pointer-events: none;
    color: $color-placeholder;
  }
  
  &__attach-button {
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    height: 3rem;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: $color-accent;
    }

    button {
      height: 100%;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: auto;
    margin-left: 0.5rem;
    border-radius: 50%;
    background: $color-light-bg;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: $color-accent;

      @media (prefers-color-scheme: dark) {
        color: $color-accent-dark;
      }
    }
  }

  .cancel-button {
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .icon {
    display: grid;
    width: 2.5rem;
    place-content: center;
    color: $color-accent;
  }
}
</style>
