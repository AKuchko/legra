<template>
  <div class="files-viewer">
    <ul class="files-viewer__list">
      <li
        v-for="file in images"
        :key="file.id"
        class="files-viewer__item"
        @click="$emit('select', file.id)"
      >
        <img :src="file.url" class="files-viewer__image" />
        <button
          class="files-viewer__button"
          title="Remove"
          @click="$emit('delete', file.id)"
        >
          <Icon icon="ion:close-round" width="20" />
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
export default {
  name: "FilesViewer",
  components: { Icon },
  props: { images: { type: Array, default: () => [] } },
  emits: ["select", "delete"],
};
</script>

<style lang="scss">
.files-viewer {
  width: 100%;

  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, 1fr);
    margin: auto;
    border-radius: 8px;
    overflow: hidden;
  }

  &__item {
    cursor: copy;
    position: relative;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      opacity: 0;
      transition: $transition-base;
      background: rgba($color: $color-dark, $alpha: 0.5);
    }
  }

  &__item:hover {
    .files-viewer__button {
      opacity: 1;
    }

    &::before {
      opacity: 1;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__button {
    position: absolute;
    cursor: pointer;
    top: 1rem;
    right: 1rem;
    opacity: 0;
    color: $color-light-bg;
    transition: $transition-base;
  }
}
</style>
