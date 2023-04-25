<template>
  <button class="file-picker" @click="filePickerInput.click()">
    <slot></slot>
    <input
      ref="filePickerInput"
      type="file"
      style="display: none"
      accept="image/png, image/gif, image/jpeg"
    />
  </button>
</template>

<script setup>
import { ref } from "vue";

const filePickerInput = ref(null);
</script>
