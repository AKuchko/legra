<template>
  <BaseBlock class="post">
    <div class="post__media">
      <img
        v-if="!isMediaMultiple"
        :src="post.media[0]"
        alt=""
        class="post__media-inner"
      />
      <BaseMediaSlider
        v-else
        :mediaList="post.media"
        class="post__media-inner"
      />
    </div>
    <div class="post__bottom">
      <div class="post__actions">
        <div class="post__button">
          <Icon icon="ph:heart" width="25" />
          <p class="post__button-text">{{ post.likes }} likes</p>
        </div>
        <div class="post__button">
          <Icon icon="ph:chat-teardrop" width="25" />
        </div>
      </div>
      <div class="post__caption">
        {{ post.caption }}
      </div>
    </div>
  </BaseBlock>
</template>

<script>
/* eslint-disable */
import BaseBlock from "./common/BaseBlock.vue";
import BaseMediaSlider from "./common/BaseMediaSlider.vue";
import { Icon } from "@iconify/vue";

export default {
  name: "PostTemplate",
  components: { BaseBlock, Icon, BaseMediaSlider },
  props: {
    post: { type: Object, default: () => {} },
  },
  computed: {
    isMediaMultiple() {
      return this.post.media.length > 1
    }
  },
};
</script>

<style lang="scss">
.post {
  padding: 10px;
  font-size: $font-small;

  &__media {
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }

  &__bottom {
    padding: 10px;
  }

  &__media-inner {
    width: 100%;
    height: 100%;
  }

  &__actions {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__button {
    display: flex;
    align-items: center;
    margin-right: 25px;
  }

  &__button-text {
    margin-left: 5px;
  }

  &__caption {
    text-align: left;
  }
}
</style>
