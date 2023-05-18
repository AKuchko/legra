<template>
  <div class="base-cropper">
    <img ref="cropperRef" :src="image.url" style="max-height: 40rem" />
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
    ratio: { type: Number, default: 3 / 4 },
    viewMode: { type: Number, default: 1 },
  },
  setup(props, { emit }) {
    let cropper = null;
    const cropperRef = ref(null);
    const sendCropperData = () => {
      emit("crop", { cropperData: cropper.getData(), id: props.image.id });
    };
    const cropperSettings = {
      viewMode: props.viewMode,
      initialAspectRatio: props.ratio,
      minContainerWidth: 320,
      minContainerHeight: 320,
      autoCropArea: 1,
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
  border-radius: 0.35rem;
  overflow: hidden;
}
</style>
