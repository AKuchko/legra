<template>
  <div class="base-cropper">
    <img ref="cropperRef" :src="image.url" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.css";

export default {
  name: "BaseCropper",
  emits: ["crop"],
  props: {
    image: { type: Object, default: () => {} },
  },
  setup(props, { emit }) {
    let cropper = null;
    const cropperRef = ref(null);
    const sendCropperData = () => {
      emit("crop", { cropperData: cropper.getData(), id: props.image.id });
    };
    const cropperSettings = {
      viewMode: 1,
      initialAspectRatio: 3 / 4,
      minContainerWidth: 320,
      minContainerHeight: 320,
      cropBoxMovable: false,
      cropBoxResizable: false,
      toggleDragModeOnDblclick: false,
      dragMode: "move",
      ready() {
        sendCropperData();
      },
      cropend() {
        sendCropperData();
      },
      zoom() {
        sendCropperData();
      },
    };

    onMounted(() => {
      cropper = new Cropper(cropperRef.value, cropperSettings);
    });

    onUnmounted(() => {
      cropper.destroy();
    });

    return {
      cropperRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-cropper {
  max-width: 20rem;
  max-height: 25rem;
}
</style>
