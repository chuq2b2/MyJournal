<template>
  <div>
    <div class="post-list content">
      <div class="filter-buttons">
        <!-- Date Filters -->
        <div class="filter-group">
          <label>Filter by Date</label>
          <v-btn variant="flat" density="comfortable" class="filter-button" @click="queryByDate('past-week')">Past Week</v-btn>
          <v-btn variant="flat" density="comfortable" class="filter-button" @click="queryByDate('this-week')">This Week</v-btn>
        </div>

        <!-- Genre Filters -->
        <div class="filter-group">
          <label>Filter by Genre</label>
          <v-select label="Genre" v-model="selectedGenre" :items="getPostGenres" variant="outlined" density="compact" class="genre-select">
          </v-select>
          <v-btn variant="flat" density="comfortable" class="filter-button" @click="applyGenreFilter">Apply</v-btn>
        </div>
      </div>

      <!-- Post Lists -->
      <div v-if="getQueryList.length === 0" class="post-container">
        <Post
          v-for="post in getAllPosts"
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

      <div v-else class="post-container">
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
    </div>
  </div>
</template>
  
<script>
import { useUserStore } from "@/stores/userStore";
import { usePostStore } from "@/stores/postStore";
import { mapState, mapActions } from "pinia";
import Post from "@/components/Post.vue";

export default {
  name: "BlogView",
  components: {
    Post,
  },
  data() {
    return {
      selectedGenre: "",
    };
  },
  computed: {
    ...mapState(useUserStore, ["userName", "signInSuccess"]),
    ...mapState(usePostStore, [
      "getAllPosts",
      "getQueryList", 
      "getPostGenres",
    ]),
  },
  methods: {
    ...mapActions(usePostStore, ["getAllPostFromDB", "queryByDateRange", "queryByGenre"]),
    refreshPosts() {
      this.getAllPostFromDB(); 
    },
    applyGenreFilter() {
      if (this.selectedGenre) {
        this.queryByGenre(this.selectedGenre);
      }
    },
    queryByDate(filterType) {
      const now = new Date(); // Current date and time

      // For "this-week"
      const startOfWeek = new Date(now);
      const dayOfWeek = now.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
      const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // If Sunday, go back 6 days to previous Monday
      startOfWeek.setDate(now.getDate() + diffToMonday);
      startOfWeek.setHours(0, 0, 0, 0);
      
      // For "past-week"
      const endOfPastWeek = new Date(startOfWeek);
      endOfPastWeek.setMilliseconds(-1); // Set to just before midnight
      const startOfPastWeek = new Date(startOfWeek);
      startOfPastWeek.setDate(startOfPastWeek.getDate() - 7);
      
      if (filterType === "past-week") {
        // Query posts from previous Monday to previous Sunday
        this.queryByDateRange(startOfPastWeek, endOfPastWeek);
      } else if (filterType === "this-week") {
        // Query posts from this Monday to now
        this.queryByDateRange(startOfWeek, now);
      }
    },
  },
  created() {
    this.getAllPostFromDB();
  },
};
</script>


<style scoped>

.filter-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5em; /* Space between groups */
  max-width: 600px;
  margin: auto;
  align-items: center;
}

.filter-group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 0.5em; 
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
}

.filter-button {
  border: 1px solid black;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #45a049;
}

.filter-button:active {
  background-color: #3e8e41; 
}

.genre-select {
  width: 200px; 
  max-width: 100%;
}
</style>