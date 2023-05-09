<script setup>
/* eslint-disable */
import BaseFiledropper from "./common/BaseFiledropper.vue";
import BaseFilepicker from "./common/BaseFilepicker.vue";
import EmbededMessage from "./EmbededMessage.vue";
import FilesViewer from "./FilesViewer.vue";
import { ref, defineEmits, defineProps, onMounted } from "vue";
import { Icon } from "@iconify/vue";

const emit = defineEmits(["send-message"]);
const props = defineProps({ reply_msg: { type: Object, default: () => {} } });
const message_text = ref("");
const message_input = ref(null);
const sendButton = ref(null);
const files = ref([]);
const embededMessage = ref(null);
const embededIcon = ref("");
let messageType = "message";

function updatemMessageText(event) {
  message_text.value = event.target.innerText;
}
function sendOnEnter(event) {
  event.preventDefault();
  sendButton.value.click();
}
function addMedia({ _files }) {
  for (let i = 0; i < _files.length; i++) {
    files.value.push(_files[i]);
  }
}
function removeMedia(_id) {
  files.value = files.value.filter((_file) => _file.id != _id);
}
function sendMessage() {
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

  cancelEmbededMessage();
  message_text.value = "";
  files.value = [];
  message_input.value.innerText = "";
}
function cancelEmbededMessage() {
  embededMessage.value = null;
  embededIcon.value = "";

  if (messageType === "edit")
    message_text.value = "";

  messageType = "message";
}

onMounted(() => {
  window.addEventListener("reply-message", (e) => {
    embededMessage.value = e.detail.target;
    embededIcon.value = "quill:reply";
    messageType = "reply";
    message_input.value.focus();
  })
  window.addEventListener("edit-message", (e) => {
    embededMessage.value = e.detail.target;
    embededIcon.value = "material-symbols:edit-rounded";
    messageType = "edit";
    message_text.value = embededMessage.value.message;
    message_input.value.innerText = message_text.value;
    message_input.value.focus();
  })
  window.addEventListener("forward-message", (e) => {
    console.log("forward");
  })
});
</script>

<template>
  <base-filedropper @file-drop="addMedia" />
  <div class="message-input-box">
    <div class="message-input-box__compose">
      <embeded-message v-if="embededMessage" :message="embededMessage" :icon="embededIcon">
        <template #icon>
          <i class="icon">
            <Icon :icon="embededIcon" width="24" />
          </i>
        </template>
        <template #footer>
          <button  class="cancel-button" @click="cancelEmbededMessage">
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 256 256"
            >
              <path
                fill="currentColor"
                d="M209.66 122.34a8 8 0 0 1 0 11.32l-82.05 82a56 56 0 0 1-79.2-79.21l99.26-100.72a40 40 0 1 1 56.61 56.55L105 193a24 24 0 1 1-34-34l83.3-84.62a8 8 0 1 1 11.4 11.22l-83.31 84.71a8 8 0 1 0 11.27 11.36L192.93 81A24 24 0 1 0 159 47L59.76 147.68a40 40 0 1 0 56.53 56.62l82.06-82a8 8 0 0 1 11.31.04Z"
              />
            </svg>
          </base-filepicker>
        </div>
      </div>
    </div>
    <button
      ref="sendButton"
      class="message-input-box__button"
      @click="sendMessage"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M1.946 9.316c-.522-.175-.526-.456.011-.635L21.043 2.32c.529-.176.832.12.684.638l-5.453 19.086c-.151.529-.456.547-.68.045L12 14l6-8l-8 6l-8.054-2.684Z"
        />
      </svg>
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
  margin-bottom: 0.5rem;

  &__compose {
    flex-grow: 1;
    max-width: calc(100% - 4rem);
    border-radius: 8px;
    background: $color-light-bg;
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
    padding: 0.75rem 0;
    padding-right: 0;
    padding-left: 0.75rem;
    white-space: pre-wrap;
    outline: none;
    word-break: break-word;
    overflow: hidden;
    text-align: initial;
  }

  &__input-placeholder {
    position: absolute;
    left: 0.75rem;
    top: 0.75rem;
    pointer-events: none;
    color: $color-placeholder;
  }
  
  &__attach-button {
    align-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
    transition: $transition-base;

    &:hover {
      color: $color-accent;
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
    width: 2.5rem;
    height: 2.5rem;
    cursor: pointer;
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
