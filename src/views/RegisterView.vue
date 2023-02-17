<template>
  <SignupForm />
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
}
</style>
