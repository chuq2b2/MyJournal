<template>
    <div class="content">
        <div v-show="showSignIn">
            <div v-if="!getSignInSuccess">
                <SignInForm @SignIn="userSignIn" />
                <div>
                <!-- Display error message if sign-in fails -->
                <p v-if="getSignInError !== ''" class="error">{{ getSignInError }}</p>
                </div>
                <h4>New to My Journal?</h4>
                <!-- Button to toggle to sign-up form -->
                <a @click="toggleShowSignUp" class="hyperlink">Sign Up</a>
            </div>
            
        </div>
  
        <div v-show="showSignUp">
        <!-- User needs to sign up for an account -->
            <div v-if="!getSignInSuccess">
                <!-- Using the SignUpForm component -->
                <SignUpForm @SignUp="userSignUp" />
                <div>
                <!-- Display error message if sign-up fails -->
                <p v-if="getSignUpError !== ''" class="error">{{ getSignUpError }}</p>
                </div>
            </div>
            <div class="sideByside">
                <h4>Already have an account?</h4>
                <a @click="toggleShowSignIn" class="hyperlink">Sign In</a>
            </div>
        </div>
    </div>
  </template>
  
  <script>
  import { useUserStore } from '@/stores/userStore';
  import { mapState, mapActions } from 'pinia';
  import SignInForm from '@/components/SignInForm.vue';
  import SignUpForm from '@/components/SignUpForm.vue';
  
  export default {
    data() {
      return {
        showSignIn: true, 
        showSignUp: false, 
      };
    },
    created() {
      this.logout();
    },
    components: {
      SignInForm,
      SignUpForm,
    },
    computed: {
      ...mapState(useUserStore, ['getSignInSuccess', 'getSignInError', 'getSignUpError']),
    },
    methods: {
      ...mapActions(useUserStore, ['userSignIn', 'userSignUp', 'logout']),
      toggleShowSignUp() {
        this.showSignUp = true;
        this.showSignIn = false;
        this.logout(); // Reset state when toggling forms
      },
      toggleShowSignIn() {
        this.showSignUp = false;
        this.showSignIn = true;
        this.logout(); // Reset state when toggling forms
      },
    },
  };
  </script>

<style scoped> 
.hyperlink {
    text-decoration: underline;
}

.hyperlink:hover {
    color: blue;
}

.error {
    color: red;
    font-size: 0.9em;
    margin-top: 0.5em;
  }

</style>