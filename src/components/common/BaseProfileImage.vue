<script>
import { computed } from "vue";
export default {
  name: "BaseProfileImage",
  props: {
    size: { type: Number, default: 50 },
    imageData: { type: Array, default: () => [] },
    user_name: { type: String },
  },
  setup(props) {
    const imageSize = computed(
      () => `width: ${props.size}px; height: ${props.size}px;`
    );
    const letterSize = computed(() => `font-size: ${props.size / 50}rem`);
    const imageContent = computed(() => {
      if (props.imageData) return !!props.imageData.length;
      return false;
    });

    // onMounted(() => {
    //   console.log(stringToColour(props.user_name));
    // });

    return {
      imageSize,
      letterSize,
      imageContent,
    };
  },
  // computed: {
  //   imageSize() {
  //     return `width: ${this.size}px; height: ${this.size}px;`;
  //   },
  // },
};
</script>

<template>
  <div class="profile-image" :style="imageSize">
    <img
      v-if="imageContent"
      :src="imageData.at(-1).data"
      alt="Image"
      class="profile-image__content"
    />
    <div v-else class="profile-image__content" :style="letterSize">
      <p>{{ user_name[0].toUpperCase() }}</p>
    </div>
    <slot></slot>
  </div>
</template>

<style lang="scss">
.profile-image {
  border-radius: 50%;
  background: $color-placeholder;
  overflow: hidden;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
