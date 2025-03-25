<template>
  <div v-if="signInSuccess">
    <div class="content">
      <h1>Prompt Generator</h1>
      <img src="../assets/writing-kid.jpg" />
    </div>
    <v-btn variant="outlined" @click="fetchRandom">Generate Random Prompt</v-btn>
    <div v-if="getContent || getGenre" class="post-card">
      <h2>Random Prompt</h2>
      <p>{{ getContent }} <v-btn variant="outlined" size="small" @click="copyContent">Copy</v-btn></p> 
      <p><strong>Genre:</strong> {{ getGenre }}</p>
    </div>
  </div>

</template>

<script>
  import { useUserStore } from "@/stores/userStore";
  import { usePromptStore } from "@/stores/promptStore";
  import { mapState, mapActions } from "pinia";

export default{
  name: "PromptView",
  computed: {
    ...mapState(useUserStore, ["userName", "signInSuccess"]),
    ...mapState(usePromptStore, ['getContent', 'getGenre'])
  },
  methods:{
    ...mapActions(usePromptStore, ["fetchRandomPrompt"]),
    fetchRandom(){
      this.fetchRandomPrompt();
    },
    copyContent() {
      if (this.getContent) {
        navigator.clipboard
          .writeText(this.getContent)
          .then(() => {
            console.log("Content copied to clipboard!");
            alert('Copied Prompt')
          })
          .catch((err) => {
            console.error("Error copying text: ", err);
          });
      } else {
        console.warn("No content to copy.");
      }
    },
  }

}
</script>
