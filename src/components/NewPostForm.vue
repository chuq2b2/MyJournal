<template>
  <div class="post-list content">
    <div class="form-container">
      <h2>Write a new post</h2>
      <v-form @submit.prevent="addNewPost">
        <label>Title:</label>
        <input v-model="newPost.title" type="text" required />

        <label>Genres:</label>
        <div class="genres-container">
          <div v-for="(genre, index) in getPostGenres" :key="genre" class="genre-item">
            <input
              type="checkbox"
              :value="genre"
              v-model="selectedGenres"
              :id="`genre-${index}`"
            />
            <label :for="`genre-${index}`" class="custom-checkbox">
              {{ genre }}
            </label>
          </div>
        </div>

        <label>Write your blog:</label>
        <textarea v-model="newPost.content" rows="6" required></textarea>

        <v-btn variant="flat" density="default" type="submit">Upload Blog</v-btn>
      </v-form>
    </div>
  </div>
</template>

<script>
import { usePostStore } from "@/stores/postStore.js";
import { useUserStore } from "@/stores/userStore";
import { mapState, mapActions } from "pinia";

export default {
  data() {
    return {
      selectedGenres: [], 
      newPost: {
        title: "",
        genre: [], 
        content: "",
        author: "",
        authorId: ""
      }
    };
  },
  computed: {
    ...mapState(usePostStore, ["getPostGenres"]),
    ...mapState(useUserStore, ["getUserName", "getUserId", "getUserEmail"])
  },
  watch: {
    // Watch for changes in selectedGenres and update newPost.genre
    selectedGenres: {
      handler(newVal) {
        this.newPost.genre = [...newVal]; 
      },
      deep: true
    }
  },
  methods: {
    ...mapActions(usePostStore, ["addNewPostToDB"]),
    getCurrentUserName() {
      if (this.getUserName === this.getUserEmail){
        this.newPost.author = "Unknown Author";
      } else {
        this.newPost.author = this.getUserName;
      }
      this.newPost.authorId = this.getUserId;
    },
    async addNewPost() {
      try {
        this.newPost.genre = [...this.selectedGenres];
        
        if (this.newPost.genre.length === 0) {
          alert("Please select at least one genre");
          return;
        }

        await this.addNewPostToDB(this.newPost);
        this.$router.push("/blogs");
      } catch (error) {
        console.error("Error adding new post: ", error);
      }
    },
    resetForm() {
      this.selectedGenres = [];
      this.newPost = {
        title: "",
        genre: [],
        content: "",
        author: "",
        authorId: this.getUserId
      };
    }
  },
  created() {
    this.resetForm();
    this.getCurrentUserName();
  }
};
</script>

<style scoped>
.post-list {
  max-width: 600px;
  margin: auto;
  padding: 2em;
  border-radius: 8px;
  border: 1px solid black;
}

h2 {
  text-align: center;
  color: #333;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.5em;
  color: #555;
  padding-top: 10px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
}

textarea {
  resize: none;
}

button {
  width: 100%;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.7em;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.2);
}

.genres-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 1em;
  margin-bottom: 1em;
}

.genre-item {
  position: relative;
}

input[type="checkbox"] {
  display: none;
}

.custom-checkbox {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5em 1em;
  font-size: 0.9em;
  background-color: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  user-select: none;
}

input[type="checkbox"]:checked + .custom-checkbox {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.custom-checkbox:hover {
  background-color: #e0e0e0;
}

.custom-checkbox:active {
  background-color: #d0d0d0;
}
</style>