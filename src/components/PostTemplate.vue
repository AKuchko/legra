<template>
  <BaseBlock class="post" :class="isMiniature ? 'post--mini' : ''">
    <div class="post__content">
      <div class="post__image">
        <img :src="`data:image/jpeg;base64,${image}`" alt="Photo" />
      </div>
      <div class="post__bottom">
        <div class="post__actions">
          <div class="post__action post__likes">
            <Icon icon="mdi:cards-heart" />
            {{ likes }}
          </div>
          <div class="post__action post__comments">
            <Icon icon="mdi:comment" :inline="true" color="#fff" />
            {{ likes }}
          </div>
        </div>
        <div class="post__note" v-if="note">
          <p class="post__note-text">{{ note }}</p>
        </div>
      </div>
    </div>
  </BaseBlock>
</template>

<script>
import BaseBlock from "./common/BaseBlock.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "PostTemplate",
  components: { BaseBlock, Icon },
  props: {
    image: { type: String, default: "" },
    likes: { type: Number, default: 100 },
    note: { type: String, default: "" },
    comments: { type: Array, default: () => [] },
    isMiniature: { type: Boolean, default: false },
  },
};
</script>

<style lang="scss">
.post {
  padding: 10px;
  width: 100%;
  transition: $transition-base; // Проблемы с анимацией

  &__content {
    height: 100%;
  }

  &__image {
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 10px;
    transition: $transition-base;
  }

  &__image img {
    width: 100%;
  }

  &__actions {
    display: flex;
  }

  &__action {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 7px 10px;
    margin-right: 10px;
    border-radius: 27px;
    background: $color-placeholder;
    font-size: $font-small;
  }

  &__note {
    margin-top: 10px;
    text-align: left;
  }
}

.post--mini {
  padding: 0;

  .post__bottom {
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
  }

  .post__image {
    height: 100%;
    border-radius: 0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
