<template>
  <form class="code-verify">
    <svg class="signup__logo" height="120" width="120">
      <circle
        cx="60"
        cy="60"
        r="57"
        stroke="gray"
        stroke-width="3"
        fill="transparent"
      />
    </svg>
    <h1 class="title-medium">
      {{ email }}
      <Icon icon="bi:pencil" />
    </h1>
    <p class="small-text">We send a verification code on your email address</p>
    <BaseInput label="code" v-model="code" />
  </form>
</template>

<script>
import { Icon } from "@iconify/vue";
import BaseInput from "./common/BaseInput.vue";

export default {
  name: "CodeVerifyForm",
  components: { BaseInput, Icon },
  data() {
    return {
      code: "",
    };
  },
  props: {
    email: {
      type: String,
      default: "",
    },
    codeModel: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.code-verify {
}
</style>
