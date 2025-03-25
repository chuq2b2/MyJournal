<template>
  <div class="sign-up-form">
    <h2>Sign Up</h2>

    <form @submit.prevent="signUp">
      <div class="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          id="sign-in-email"
          placeholder="Enter your email"
          v-model="signUpEmail"
          required
        />
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          id="sign-in-password"
          placeholder="Enter your password"
          v-model="signUpPassword"
          required
        />
        <div>
          <button type="button" @click="togglePasswordVisibility">
            <span v-if="showPassword">Hide</span>
            <span v-else>Show</span>
          </button>
        </div>
      </div>

      <p v-show="!signUpStatus">Missing Email or Password</p>

      <v-btn variant="flat" density="default" type="submit">Sign Up</v-btn>
    </form>
  </div>
</template>
  
<script>
export default {
  emits: ['SignUp'],
  data() {
    return {
      signUpEmail: '',
      signUpPassword: '',
      showPassword: false,
    };
  },
  computed: {
    signUpStatus() {
      return this.signUpEmail !== '' && this.signUpPassword !== '';
    },
  },
  methods: {
    signUp() {
      if (this.signUpStatus) {
        this.$emit('SignUp', {
          email: this.signUpEmail,
          password: this.signUpPassword,
        });
        this.signUpEmail = '';
        this.signUpPassword = '';
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

 