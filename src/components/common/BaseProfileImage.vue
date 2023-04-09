<template>
  <div class="profile-image" :style="imageSize">
    <img :src="imageData" alt="Image" class="profile-image__image" />
  </div>
</template>

<script>
export default {
  name: "BaseProfileImage",
  props: {
    size: { type: Number, default: 50 },
    imageData: { type: String },
  },
  computed: {
    imageSize() {
      return `width: ${this.size}px; height: ${this.size}px;`;
    },
  },
};
</script>

<style lang="scss">
.profile-image {
  border-radius: 50%;
  background: $color-placeholder;
  overflow: hidden;

  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
