<script setup>
import { ref, defineProps, defineEmits } from "vue";

const sendButton = ref(null);
const emit = defineEmits(["on-message-input", "send-message"]);
const props = defineProps({
  message_model: { type: String, default: "" },
});

function sendOnEnter(event) {
  event.preventDefault();
  if (props.message_model) sendButton.value.click();
}
</script>

<template>
  <div class="message-input-box">
    <div class="message-input-box__message-wrapper">
      <div
        class="message-input-box__message-text"
        contenteditable="true"
        :value="props.message_model"
        @input="emit('on-message-input', $event.target.innerText)"
        @keydown.enter.exact.prevent="sendOnEnter"
      ></div>
    </div>
    <button
      ref="sendButton"
      class="message-input-box__send-button"
      @click="emit('send-message')"
    ></button>
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
    width: 100%;
    max-width: 25rem;
    overflow-y: scroll;
    height: 100%;
    padding: 0.5rem;
    border-radius: 10px;
    background: $color-light-bg;
  }

  &__message-text {
    display: inline;
    width: 100%;
    height: 100%;
    line-height: 1rem;
  }

  &__send-button {
    border-radius: 50%;
    background: $color-light-bg;
    width: 1.9rem;
    height: 1.9rem;
  }
}
</style>
