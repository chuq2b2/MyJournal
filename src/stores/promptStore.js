import { defineStore } from 'pinia'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/firebase/init'

export const usePromptStore = defineStore('prompt-store', {
  state: () => ({
    content: '',
    genre: ''
  }),

  getters: {
    getContent: (state) => state.content,
    getGenre: (state) => state.genre,
  },

  actions: {
    
    async fetchRandomPrompt() {
      try {
        const promptsCollection = collection(db, 'prompts');
        const querySnapshot = await getDocs(promptsCollection);

        // Convert the documents to an array
        const prompts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        if (prompts.length === 0) {
          console.error('No prompts found in the database.');
          return;
        }

        // Get a random prompt
        const randomIndex = Math.floor(Math.random() * prompts.length);
        const randomPrompt = prompts[randomIndex];

        // Update the state
        this.content = randomPrompt.content;
        this.genre = randomPrompt.genre;

        console.log('Random Prompt:', randomPrompt);
      } catch (error) {
        console.error('Error fetching random prompt:', error.message);
      }
    },
  }
})