<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">My Journal</RouterLink>
        <RouterLink to="/blogs">Blogs</RouterLink>
        <RouterLink v-if="getSignInSuccess" to="/prompt">Prompt</RouterLink>
        <RouterLink v-if="getSignInSuccess" to="/new-post">New Post</RouterLink>
        <RouterLink v-if="getSignInSuccess" to="/profile">Profile</RouterLink>
        <RouterLink v-if="!getSignInSuccess" to="/login">Login</RouterLink>
        <a id="logout-btn" v-else @click="logUserOut">Log Out</a>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script>

import { RouterLink, RouterView } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { mapState, mapActions } from 'pinia';

export default {
  components: {
      RouterLink,
      RouterView
  },
  computed: {
    ...mapState(useUserStore, ['getSignInSuccess']),
  },
  methods: {
    ...mapActions(useUserStore, ['logout']),
    logUserOut() {
      this.logout();
      this.$router.push('/login');
    }
  }
}
</script>
