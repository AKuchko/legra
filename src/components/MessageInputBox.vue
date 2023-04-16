<script setup>
    import { defineProps, defineEmits } from "vue";

    const emit = defineEmits(["on-message-input"]);
    const props = defineProps({
        message_model: { type: String, default: "" },
    });
</script>

<template>
  <div class="message-input-box">
    <div class="message-input-box__message-wrapper">
      <div
        class="message-input-box__message__text"
        contenteditable="true"
        :value="props.message_model"
        @input="emit('on-message-input', $event.target.innerText)"
      ></div>
    </div>
    <button class="message-input-box__send-button"></button>
  </div>
</template>

<style lang="scss" scoped>
.message-input-box {
  display: flex;
  align-items: center;

  &__message-wrapper {
    width: 100%;
    height: 100%;
  }
}
</style>
