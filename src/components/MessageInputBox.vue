<script setup>
import BaseFiledropper from "./common/BaseFiledropper.vue";
import BaseFilepicker from "./common/BaseFilepicker.vue";
import { ref, defineProps, defineEmits } from "vue";

const emit = defineEmits(["on-message-input", "send-message"]);
const props = defineProps({ message_model: { type: String, default: "" } });
const sendButton = ref(null);
const files = ref([]);

function sendOnEnter(event) {
  event.preventDefault();
  if (props.message_model) sendButton.value.click();
}
function addFiles(_files) {
  for (let _file of _files) {
    files.value.push(_file);
  }
  console.log(files.value);
}
</script>

<template>
  <div class="message-input-box">
    <base-filedropper @file-drop="addFiles" />
    <div class="message-input-box__message-wrapper">
      <div
        class="message-input-box__message-text"
        contenteditable="true"
        :value="props.message_model"
        @input="emit('on-message-input', $event.target.innerText)"
        @keydown.enter.exact.prevent="sendOnEnter"
      ></div>
      <base-filepicker>
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
    <button
      ref="sendButton"
      class="message-input-box__button"
      @click="emit('send-message')"
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

<style lang="scss" scoped>
[contenteditable] {
  outline: 0px solid transparent;
}

.message-input-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-height: 12rem;
  font-size: $font-small;
  text-align: left;
  margin: 1rem 0;

  &__message-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 25rem;
    height: 100%;
    min-height: 2.5rem;
    margin: 0 10px;
    padding: 0.5rem;
    border-radius: 8px;
    overflow-y: scroll;
    background: $color-light-bg;
  }

  &__message-text {
    display: inline;
    width: 100%;
    height: 100%;
  }

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: $color-light-bg;
    width: 2.5rem;
    height: 2.5rem;
  }
}
</style>
