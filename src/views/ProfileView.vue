<template>
  <div class="content">
    <div v-if="signInSuccess" class="post-card">
    <h1>Profile</h1>
    
    <!-- Display User Information -->
    <p>UserName: {{ getUserName }}</p>
    <p>Email: {{ getUserEmail }}</p>
    <p>Bio: {{ getUserBio }}</p>

    <!-- Edit Button -->
    <button v-if="!isEditing" @click="editProfile">Edit</button>

    <!-- Form for Editing -->
    <div v-if="isEditing">
      <input v-model="editableUserName" type="text" placeholder="Enter new username" />
      <textarea v-model="editableBio" placeholder="Enter new bio"></textarea>
      
      <button @click="saveProfile">Save</button>
      <button @click="cancelEdit">Cancel</button>
    </div>
  </div>
  </div>
  
</template>

<script>
import { useUserStore } from "@/stores/userStore";
import { mapState, mapActions } from "pinia";

export default {
  name: "Profile",
  computed: {
    ...mapState(useUserStore, ["getUserName", "getUserEmail", "getUserBio", "signInSuccess"]),
  },
  data() {
    return {
      isEditing: false,
      editableUserName: this.getUserName, 
      editableBio: this.getUserBio, 
    };
  },
  methods: {
    ...mapActions(useUserStore, ["updateUserProfile", "getUserProfile"]),
    // Toggle edit mode
    editProfile() {
      this.isEditing = true;
    },
    // Save the updated values to the store
    async saveProfile() {
      await this.updateUserProfile(this.editableUserName || this.getUserName, this.editableBio || this.getUserBio);
      await this.getUserProfile()
      this.isEditing = false; // Exit edit mode
      console.log("Profile updated successfully:", this.getUserName, this.getUserBio);
    },
    // Cancel the edits
    cancelEdit() {
      this.isEditing = false;
      this.editableUserName = this.getUserName; 
      this.editableBio = this.getUserBio; 
    }
  }
};
</script>

<style scoped>
/* Styling for the profile page */
button {
  margin-top: 1em;
  padding: 0.5em 1em;
  border: none;
  border-radius: 5px;
  border: 1px solid black;
  background-color: white;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

input,
textarea {
  padding: 0.5em;
  margin: 0.5em 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

textarea, input {
  resize: vertical;
}

label {
  font-weight: bold;
}
</style>