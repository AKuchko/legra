<template>
  <div class="dropArea">
    <transition-fade>
      <div v-if="showDropArea" class="dropArea__wrapper">
        <div class="dropArea__target">
          <div
            class="dropArea__target-content"
            :class="{ 'dropArea__target-content--drag-over': dragOver }"
            @dragover.prevent.stop="setDragOver(true)"
            @dragleave.prevent.stop="setDragOver(false)"
            @drop="sendFiles"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M40 472h432V40H40Zm400-123.858L328.628 236.769l46.6-46.6L440 254.935ZM72 72h368v137.68l-64.769-64.77L306 214.142l-100-100l-134 134Zm0 221.4l134-134l234 234V440H72Z"
              />
            </svg>
            <p>Drop photo here</p>
          </div>
        </div>
      </div>
    </transition-fade>
  </div>
</template>

<script setup>
import TransitionFade from "../TransitionFade.vue";
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import readFileURL from "@/utils/file.util";

const emit = defineEmits(["file-drop"]);
const body = document.querySelector("body");
const showDropArea = ref(false);
const dragOver = ref(false);
const setDragOver = (value) => (dragOver.value = value);

async function sendFiles(event) {
  const dropped_files = event.dataTransfer.files;
  const _files = new Array();

  for (let i = 0; i < dropped_files.length; i++) {
    if (dropped_files[i].type.split("/")[0] !== "image") continue;
    const file_url = await readFileURL(dropped_files[i]);
    _files.push({
      id: Date.now(),
      url: file_url,
      file: dropped_files[i],
    });
  }
  emit("file-drop", _files);
}
// body file drag logic
function bodyDragEneter(event) {
  event.preventDefault();
  if (showDropArea.value) return;
  if (event.dataTransfer.types) showDropArea.value = true;
}
function bodyDragLeave(event) {
  event.preventDefault();
  if (!showDropArea.value) return;
  if (event.x === 0 && event.y === 0) showDropArea.value = false;
}
function bodyDragOver(event) {
  event.preventDefault();
}
function bodyDrop(event) {
  event.preventDefault();
  showDropArea.value = false;
}

onMounted(() => {
  body.addEventListener("dragenter", bodyDragEneter);
  body.addEventListener("dragleave", bodyDragLeave);
  body.addEventListener("dragover", bodyDragOver);
  body.addEventListener("drop", bodyDrop);
});

onUnmounted(() => {
  body.removeEventListener("dragenter", bodyDragEneter);
  body.removeEventListener("dragleave", bodyDragLeave);
  body.removeEventListener("dragover", bodyDragOver);
  body.removeEventListener("drop", bodyDrop);
});
</script>

<style lang="scss">
.dropArea {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 0;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 100vh;
    padding: 80px 20px 20px;
    z-index: 55;
  }

  &__target {
    position: relative;
    display: flex;
    flex: 1 1 auto;
    width: 100%;
    max-width: 43rem;
    padding: 10px;
    border-radius: 18px;
    background: $color-light-bg;
  }

  &__target-content {
    flex: 1 1 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border: 0.15rem dashed $color-dark;
    border-radius: 8px;
    font-size: $font-medium;

    &--drag-over {
      border-color: $color-accent;
      color: $color-accent;
    }
  }
}
</style>
