<template>
  <SignupForm />
</template>

<script>
// import VerifyCodeForm from "@/components/VerifyCodeForm.vue";
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
}
</style>
