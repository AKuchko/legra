<template>
  <div v-show="modalVisibility" class="modal">
    <transition name="fade" @click="$emit('close-popup')">
      <div class="modal__overlay"></div>
    </transition>
    <div
      class="modal__window secondary"
      :class="{ 'drop-area--drag-over': isDragover }"
      @dragover.prevent="setDragOver(true)"
      @dragleave="setDragOver(false)"
      @drop.prevent="addFiles"
    >
      <form method="post" class="modal__form" @submit.prevent="createPost">
        <CropperList
          :fileList="addedFiles"
          class="modal__form-input"
          @crop="updateCropperData"
        />
        <FilesViewer
          :images="addedFiles"
          class="modal__form-input"
          @select="selectFile"
          @delete="deleteFile"
        />
        <p class="modal__form-input" @click="dropInput.click()">
          Drag or select files
        </p>
        <BaseInput
          class="modal__form-input"
          label="Type caption"
          :modelValue="post_caption"
          @update:modelValue="updateCaption"
        />
        <BaseButton class="modal__form-input">Commit</BaseButton>
        <input
          ref="dropInput"
          type="file"
          style="display: none"
          multiple
          @change="addFiles"
        />
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import BaseBlock from "./common/BaseBlock.vue";
import BaseButton from "./common/BaseButton.vue";
import BaseInput from "./common/BaseInput.vue";
import CropperList from "./CropperList.vue";
import FilesViewer from "./FilesViewer.vue";
import postService from "@/services/post.service";

export default {
  name: "CreateModal",
  emits: ["close-popup"],
  props: {
    modalVisibility: { type: Boolean, default: false },
  },
  components: { BaseButton, BaseInput, CropperList, FilesViewer },
  setup(props, { emit }) {
    const dropInput = ref(null);
    const addedFiles = ref([]);
    const selectedFile = ref(null);
    const isDragover = ref(false);
    const post_media = new DataTransfer();
    const post_caption = ref("");
    const post_cropper = [];

    function setDragOver(_value) {
      isDragover.value = _value;
    }
    function deleteFile(id) {
      addedFiles.value = addedFiles.value.filter((file) => file.id !== id);
    }
    function updateCaption(_value) {
      post_caption.value = _value;
    }
    function updateCropperData(data) {
      const updatedFile = addedFiles.value.find((file) => file.id === data.id);
      updatedFile.cropperData = data.cropperData;
    }
    function selectFile(id) {
      addedFiles.value.forEach((file) => {
        if (file.id === id) file.selected = true;
        else file.selected = false;
      });
    }
    function addFiles(event) {
      const _files = event.target.files || event.dataTransfer.files;
      const reader = new FileReader();

      for (let i = 0; i < _files.length; i++) {
        const file = _files[i];

        reader.onload = (event) => {
          addedFiles.value.push({
            id: Date.now(),
            url: event.target.result,
            file: file,
            cropperData: {},
            selected: addedFiles.value.length === 0 ? true : false,
          });
          if (!selectedFile.value) selectedFile.value = event.target.result;
        };

        reader.readAsDataURL(file);
      }
    }
    function createPost() {
      if (addedFiles.value.length === 0) return;

      addedFiles.value.forEach((file) => {
        post_media.items.add(file.file);
        post_cropper.push(file.cropperData);
      });

      postService.createPost({
        post_media: post_media.files,
        post_cropper: post_cropper,
        post_caption: post_caption.value,
      });

      post_media.clearData();
      post_cropper.splice(0, post_cropper.length);
      post_caption.value = "";
      addedFiles.value.splice(0, addedFiles.value.length);
      emit("close-popup");
    }

    return {
      dropInput,
      isDragover,
      post_caption,
      addedFiles,
      selectedFile,
      updateCaption,
      addFiles,
      setDragOver,
      createPost,
      selectFile,
      deleteFile,
      updateCropperData,
    };
  },
};
</script>

<style lang="scss">
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100svh;
    background: rgba($color: #000000, $alpha: 0.5);
    z-index: 90;
  }

  &__window {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 47rem;
    height: auto;
    max-height: 100%;
    padding: 25px;
    z-index: 99;
    overflow-y: scroll;
  }

  &__form-input:not(:last-child) {
    display: block;
    margin-bottom: 25px;
  }

  &__image-list {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    border-radius: 10px;
  }

  &__image-item {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 10rem;
    max-height: 10rem;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__cropper {
    max-width: 30rem;
    max-height: 30rem;
    margin: auto;
  }
}
</style>
