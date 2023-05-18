<template>
  <div class="embeded-message">
    <slot name="icon"></slot>
    <div class="embeded-message__body">
      <img
        v-if="message.media.length"
        :src="message.media[0].data"
        class="embeded-message__media"
      />
      <div class="embeded-message__msg-info">
        <p class="embeded-message__user-name">{{ message.user_name }}</p>
        <p>
          <span>{{ message.message }}</span>
        </p>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
export default {
  name: "EmbededMessage",
  props: {
    message: { type: Object },
  },
};
</script>

<style lang="scss">
.embeded-message {
  display: flex;
  width: 100%;

  &__body {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    font-size: 0.7rem;
    line-height: 0.9rem;
    overflow: hidden;
    border-radius: 0.5rem;
    padding: 0.125rem 0.25rem 0.125rem 0.4375rem;
    transition: $transition-base;

    &::before {
      content: "";
      position: absolute;
      left: 0.375rem;
      top: 0.125rem;
      width: 2px;
      height: 90%;
      border-radius: 2px;
      background: $color-accent;
    }

    &:hover {
      background: rgba($color: #000000, $alpha: 0.1);
    }
  }

  &__msg-info {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    text-align: left;
    margin-inline-start: 0.35rem;

    p {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
      color: $color-accent;
      max-width: 100%;
      height: 0.5rem;

      span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  &__media {
    width: 1.7rem;
    height: 1.7rem;
    margin-left: 0.125rem;
    border-radius: 0.2rem;
  }
}
</style>
