<template>
    <div class="post-card">
        <div class="genres">
            <ul>
                <li v-for="(g, index) in genre" :key="index">{{ g }}</li>
            </ul>
        </div>
        <p> {{ formattedDate }}</p>
        <h2>{{ title }}</h2>
        <p>by {{ author }}</p>
        <p> {{ content }}</p>
        <v-btn color="red" v-if="authorId == this.getUserId" class="ma-2 mt-8"  variant="flat" @click="handleDelete">Delete</v-btn>
      </div>
</template>
    
<script>
import { mapState, mapActions } from 'pinia';
import { useUserStore } from '@/stores/userStore';
import { usePostStore } from '@/stores/postStore';

export default{
    name: "Post",
    props: {
        id: { type: String, required: true },
        title: {
            type: String,
            required: true
        },
        genre: {
            type: Array,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdAt: {
            type: Object,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        authorId: {
            type: String,
            required: true
        }

    },
    computed: {
        ...mapState(useUserStore, ["getUserId"]),
        formattedDate() {
        const date = this.createdAt.toDate();
        return this.formatDate(date);
        },
    },
    methods: {
        ...mapActions(usePostStore, ["deletePost"]),
        handleDelete(){
            try {
                if (this.authorId !== this.getUserId) {
                    throw new Error('You are not authorized to delete this post.');
                }
                this.deletePost(this.id);
                this.$emit('postDeleted');
            } catch (error) {
                console.error('Error deleting post:', error.message);
            }
        },
        formatDate(date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
            return date.toLocaleDateString('en-US', options);
        },
    },
}
</script>

