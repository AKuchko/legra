<template>
  <div class="login">
    <svg class="login__logo" height="120" width="120">
      <circle
        cx="60"
        cy="60"
        r="57"
        stroke="gray"
        stroke-width="3"
        fill="transparent"
      />
    </svg>
    <h1 class="login__title title-medium">Legram</h1>
    <p class="login__subtitle small-text">
      Enter your email adress and password
    </p>
    <form class="login__form" @submit.prevent="login">
      <ul class="login__input-group">
        <li class="login__input">
          <BaseInput
            v-model="model.email"
            type="email"
            label="Your email adress"
          />
        </li>
        <li class="login__input">
          <BaseInput
            v-model="model.password"
            type="password"
            label="Your password"
          />
        </li>
      </ul>
      <BaseButton type="submit">Test button</BaseButton>
      <p class="login__caption">
        If you donn't have ann account – you can
        <a href="#/register" class="base-link">create one</a>
        .
      </p>
    </form>
  </div>
</template>

<script>
import BaseInput from "@/components/common/BaseInput.vue";
import BaseButton from "@/components/common/BaseButton.vue";
import authService from "@/services/auth.service";

export default {
  components: { BaseInput, BaseButton },
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      authService.login(this.model).catch((err) => {
        console.log(err);
      });
      this.model.email = "";
      this.model.password = "";
    },
  },
};
</script>

<style lang="scss">
.login {
  font-size: $font-base;

  &__logo {
    margin: 0 auto 15px;
  }

  &__subtitle {
    margin-bottom: 40px;
  }

  &__input-group {
    margin-bottom: 30px;
  }

  &__input {
    display: flex;
    justify-content: center;
  }

  &__input:not(:last-child) {
    margin-bottom: 15px;
  }

  &__caption {
    margin: 15px 0;
    font-size: $font-small;
  }
}
</style>
