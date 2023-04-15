<template>
  <div class="comment" :class="{ 'comment--me': isMyComment }">
    <router-link class="comment__profile-image" :to="userLink">
      <BaseProfileImage :size="30" :imageData="comment.profile_image" />
    </router-link>
    <div class="comment__content">
      <p class="comment__nickname">{{ comment.user_name }}</p>
      <p class="comment__text">{{ comment.comment_text }}</p>
    </div>
  </div>
</template>

<script>
import BaseProfileImage from "./common/BaseProfileImage.vue";
import { mapGetters } from "vuex";

export default {
  name: "CommentTemplate",
  components: { BaseProfileImage },
  props: { comment: { type: Object, default: () => {} } },
  computed: {
    ...mapGetters(["userInfo"]),
    isMyComment() {
      return this.userInfo.user_id === this.comment.user_id;
    },
    userLink() {
      return { name: "account", params: { user_id: this.comment.user_id } };
    },
  },
};
</script>

<style lang="scss">
.comment {
  display: flex;
  font-size: $font-small;

  &__content {
    padding: 10px;
    border-radius: 10px;
    text-align: left;
    background: #ececec;
  }

  &__nickname {
    margin-bottom: 5px;
    font-size: $font-xsmall;
  }

  &__profile-image {
    margin: auto 10px 0 0;
  }
}

.comment--me {
  flex-direction: row-reverse;

  .comment__profile-image {
    margin: auto 0 0 10px;
  }

  .comment__content {
    color: $color-light;
    background: $color-accent;
  }
}
</style>
