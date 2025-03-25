<template>
  <div class="sign-in-form">
    <h2>Sign In</h2>
    <v-form @submit.prevent="signIn">
      <div class="form-group">
        <label for="email">Email:</label>
        <input id="email" v-model="signInEmail" type="email" placeholder="Enter your email" />
      </div>

    <div class="form-group">
        <label for="password">Password:</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          placeholder="Enter your password"
          id="password"
          v-model="signInPassword"
          required
        />
        <div>
          <button type="button" @click="togglePasswordVisibility">
            <span v-if="showPassword">Hide</span>
            <span v-else>Show</span>
          </button>
        </div>
      </div>
    
      <p v-show="!signInStatus" class="error">Missing Email or Password</p>

      <v-btn variant="flat" density="default"  type="submit">Sign In</v-btn>
    </v-form>
  </div>
</template>
  
<script>
export default {
  name: 'SignInForm',
  emits: ['SignIn'],
  data() {
    return {
      signInEmail: '',
      signInPassword: '',
      showPassword: false,
    };
  },
  computed: {
    signInStatus() {
      return this.signInEmail !== '' && this.signInPassword !== '';
    }
  },
  methods: {
    signIn() {
      if (this.signInStatus) {
        try {
          this.$emit('SignIn', { email: this.signInEmail, password: this.signInPassword });
        } catch (error) {
          console.error('Error during sign-in:', error);
          this.signInError = 'Sign-in failed. Please check your credentials.';
        }
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  }
};
</script>
  
