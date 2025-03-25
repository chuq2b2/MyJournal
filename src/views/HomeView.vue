<template>
  <div class="post-card content" v-if="!signInSuccess">
    <h1>Welcome to My Journal Homepage</h1>
    <p>This is a safe <strong>space</strong> for you to upload blogs and challenge yourself with writing</p>
    <div class="home-image">
    </div>
  </div>
  <div v-if="signInSuccess" class="content">
    <h1>{{ getUserName }}'s Journal</h1>
    <div v-if="getQueryList.length" class="post-container">
      <Post
        v-for="post in getQueryList"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :genre="post.genre"
        :content="post.content"
        :createdAt="post.createdAt"
        :author="post.author"
        :authorId="post.authorId"
        @postDeleted="refreshPosts"
      />
    </div>
    <div v-else class="no-posts-message">
      <p>You haven't created any posts yet. Start writing your first blog!</p>
    </div>
  </div>
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { usePostStore } from "@/stores/postStore";
import { mapState, mapActions } from "pinia";
import Post from "@/components/Post.vue";

export default {
  name: "HomeView",
  components: {
    Post,
  },
  computed: {
    ...mapState(useUserStore, ["getUserName", "signInSuccess", "getUserId"]), 
    ...mapState(usePostStore, ["getQueryList"]),
  },
  methods: {
    ...mapActions(usePostStore, ["queryPostsByUser"]),
    refreshPosts() {
        this.fetchUserPosts();
      },
    async fetchUserPosts() {
      try {
        if (this.signInSuccess && this.getUserId) {
          await this.queryPostsByUser(this.getUserId);
        }
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    },
  },
  watch: {
    // Watch for changes in sign-in status and user ID
    signInSuccess(newValue) {
      if (newValue && this.getUserId) {
        this.fetchUserPosts();
      }
    },
    getUserId(newValue) {
      if (newValue && this.signInSuccess) {
        this.fetchUserPosts();
      }
    },
  },
  async created() {
  if (this.signInSuccess && this.getUserId) {
    await this.fetchUserPosts();
  } else {
    console.log('Not calling fetchUserPosts: conditions not met');
  }
},
};
</script>