<template>
  <button
    class="file-picker"
    style="cursor: pointer"
    @click="filePickerInput.click()"
  >
    <slot></slot>
    <input
      ref="filePickerInput"
      type="file"
      style="display: none"
      accept="image/png, image/gif, image/jpeg"
      multiple
      @change="sendFiles"
    />
  </button>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import readFileURL from "@/utils/file.util";

const emit = defineEmits(["file-select"]);
const filePickerInput = ref(null);

async function sendFiles(event) {
  const _files_data = event.target.files;
  const _files = new Array();

  for (let i = 0; i < _files_data.length; i++) {
    if (_files_data[i].type.split("/")[0] !== "image") continue;

    const file_url = await readFileURL(_files_data[i]);

    _files.push({ id: Date.now(), url: file_url, file: _files_data[i] });
  }
  emit("file-select", { _files });
}
</script>
