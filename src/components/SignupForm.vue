<template>
  <div class="signup-form">
    <svg class="signup-form__logo" height="120" width="120">
      <circle
        cx="60"
        cy="60"
        r="57"
        stroke="gray"
        stroke-width="3"
        fill="transparent"
      />
    </svg>
    <h1 class="title-medium signup-form__title">Legram</h1>
    <p class="small-text signup-form__subtitle">
      Wee need your clothes, your boots and your email adress.
    </p>
    <form class="signup-form__form" @submit.prevent="signup">
      <ul class="signup-form__input-list">
        <li class="signup-form__input">
          <BaseInput v-model="userModel.email" label="Your email" />
        </li>
        <li class="signup-form__input">
          <BaseInput v-model="userModel.password" label="Password" />
        </li>
        <li class="signup-form__input">
          <BaseButton v-if="isEmailCorrect" type="submit">Signup</BaseButton>
        </li>
      </ul>
      <p v-if="!isEmailCorrect">Incorrect</p>
    </form>
  </div>
</template>

<script>
import BaseInput from "./common/BaseInput.vue";
import BaseButton from "./common/BaseButton.vue";
import authService from "@/services/auth.service";

export default {
  name: "SignupForm",
  components: { BaseInput, BaseButton },
  data() {
    return {
      userModel: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    isEmailCorrect() {
      const EMAIL_REGEXP =
        /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
      return EMAIL_REGEXP.test(this.userModel.email);
    },
  },
  methods: {
    signup() {
      authService
        .register(this.userModel)
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style lang="scss">
.signup-form {
  &__logo {
    margin-bottom: 15px;
  }

  &__subtitle {
    margin-bottom: 40px;
  }

  &__input:not(:last-child) {
    margin-bottom: 15px;
  }
}
</style>
