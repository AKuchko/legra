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
        <button class="files-viewer__button" @click="$emit('delete', file.id)">
          <span>Del</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "FilesViewer",
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
    position: relative;
    overflow: hidden;
  }

  &__item:hover .files-viewer__button {
    opacity: 1;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    opacity: 0;
    transition: $transition-base;
  }
}
</style>
