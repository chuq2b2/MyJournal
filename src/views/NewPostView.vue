<template>
  <div v-if="signInSuccess" class="content">
    <NewPostForm />
  </div>
</template>

<script>
import NewPostForm from '@/components/NewPostForm.vue';
import { useUserStore } from '@/stores/userStore'
import { mapState, mapActions } from 'pinia'

export default {
  components: {
      NewPostForm,
  },
  computed: {
      ...mapState(useUserStore, [
          'getUserName',
          'getSignUpSuccess',
          'getSignUpError',
          'signInSuccess'
      ])
  },
  methods: {
      ...mapActions(useUserStore, ['userSignUp'])
  }
}
</script>