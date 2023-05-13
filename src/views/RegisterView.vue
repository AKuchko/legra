<template>
  <div class="signup">
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "@/components/SignupForm.vue";

export default {
  components: { SignupForm },
  data() {
    return {
      model: {
        email: "",
        password: "",
        code: "",
      },
    };
  },
};
</script>

<style lang="scss">
.signup {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
