<template>
  <div class="cropper-list">
    <ul class="cropper-list__croppers">
      <li
        v-for="file in fileList"
        :key="file.id"
        class="cropper-list__cropper"
        :class="{ 'cropper-list__cropper--hidden': !file.selected }"
      >
        <BaseCropper
          :image="file"
          :ratio="3 / 4"
          :viewMode="1"
          @crop="updateCrop"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import BaseCropper from "./common/BaseCropper.vue";

export default {
  name: "CropperList",
  emits: ["crop"],
  components: { BaseCropper },
  props: {
    fileList: { type: Array, default: () => [] },
  },
  methods: {
    updateCrop(newData) {
      this.$emit("crop", newData);
    },
  },
};
</script>

<style lang="scss" scoped>
.cropper-list {
  width: 100%;

  &__croppers {
    margin: auto;
  }

  &__cropper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    overflow: hidden;
  }

  &__cropper--hidden {
    position: absolute;
    left: -100vw;
    visibility: hidden;
  }
}
</style>
