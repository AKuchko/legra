<script setup>
import TransitionFade from "../transitions/TransitionFade.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted, onUnmounted, defineEmits } from "vue";
import readFileURL from "@/utils/file.util";

const emit = defineEmits(["file-drop"]);
const body = document.querySelector("body");
const showDropArea = ref(false);
const dragOver = ref(false);
const setDragOver = (value) => (dragOver.value = value);

async function sendFiles(event) {
  const _files_data = event.dataTransfer.files;
  const _files = new Array();

  for (let i = 0; i < _files_data.length; i++) {
    if (_files_data[i].type.split("/")[0] !== "image") continue;

    const file_url = await readFileURL(_files_data[i]);

    _files.push({ id: Date.now(), url: file_url, file: _files_data[i] });
  }
  emit("file-drop", { _files });
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

<template>
  <div class="dropArea">
    <transition-fade>
      <div v-if="showDropArea" class="dropArea__wrapper">
        <div class="dropArea__target secondary">
          <div
            class="dropArea__target-content"
            :class="{ 'dropArea__target-content--drag-over': dragOver }"
            @dragover.prevent.stop="setDragOver(true)"
            @dragleave.prevent.stop="setDragOver(false)"
            @drop="sendFiles"
          >
            <Icon icon="ion:document" width="20%" />
            <p>Drop photo here</p>
          </div>
        </div>
      </div>
    </transition-fade>
  </div>
</template>

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
    padding: 2.5rem 2rem 2rem;
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
    transition: $transition-base;

    p {
      color: $color-dark;
    }

    &--drag-over {
      border-color: $color-accent;
      color: $color-accent;

      p {
        color: $color-accent;
      }

      @media (prefers-color-scheme: dark) {
        border-color: $color-accent-dark;
        color: $color-accent-dark;

        p {
          color: $color-accent-dark;
        }
      }
    }
  }
}
</style>
