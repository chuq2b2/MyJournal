import { defineStore } from "pinia";
import { collection, query, getDocs, where, setDoc, doc, serverTimestamp, Timestamp, orderBy, deleteDoc } from 'firebase/firestore'
import { db } from '@/firebase/init.js'

export const usePostStore = defineStore('post-store', {
    state: () => {
        return {
            postGenres: [
                "Action",
                "Adventure",
                "Comedy",
                "Drama",
                "Fantasy",
                "Fiction",
                "Horror",
                "Mystery",
                "Romance",
                "NonFiction",
                "Thriller",
                "Western",
                "Food",
                "Travel",
                "Tips and Tricks",
                "Health and Fitness",
                "Fashion and Beauty",
                "Photography",
                "Personal",
                "Business",
                "Music",
                "DIY",
                "Others"
              ],
            postList: [],
            queryList: []
        }
    },
    getters: {
        getPostGenres: (state) => state.postGenres,
        getAllPosts: (state) => state.postList,
        getQueryList: (state) => state.queryList,
    },
    actions: {
        async deletePost(postId) {
            try {
              const docRef = doc(db, 'blogs', postId);
              await deleteDoc(docRef);
              console.log('Post deleted successfully!');
            } catch (error) {
              console.error('Error deleting post:', error.message);
            }
        },
        async addNewPostToDB(postToAdd) {
            try {
                const docRef = doc(collection(db, 'blogs')); 
                await setDoc(docRef, {
                    id: docRef.id, 
                    title: postToAdd.title,
                    genre: postToAdd.genre,
                    content: postToAdd.content,
                    createdAt: serverTimestamp(),
                    author: postToAdd.author, 
                    authorId: postToAdd.authorId
                });
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        },
        async getAllPostFromDB() {
            try {
                const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc') )
                const querySnapshot = await getDocs(q)
                
                this.queryList = []
                querySnapshot.forEach((doc) => {
                    this.queryList.push({ id: doc.id, ...doc.data() });
                })
            } catch (error) {
                console.error("Error getting post: ", error)
            }
        },

        async queryByGenre(selectedGenre) {
            try {
                const q = query(
                    collection(db, 'blogs'),
                    where('genre', 'array-contains', selectedGenre),
                    orderBy('createdAt', 'desc')
                )
                const querySnapshot = await getDocs(q)
                
                this.queryList = []
                querySnapshot.forEach((doc) => {
                    this.queryList.push({ id: doc.id, ...doc.data() })
                })
            } catch (error) {
                console.error("Error querying posts by genre:", error)
            }
        },

        async queryByDateRange(startDate, endDate) {
            try {
              const blogsCollection = collection(db, "blogs");
              const q = query(
                blogsCollection,
                where("createdAt", ">=", Timestamp.fromDate(startDate)),
                where("createdAt", "<=", Timestamp.fromDate(endDate)),
                orderBy('createdAt', 'desc') 
              );
              const querySnapshot = await getDocs(q);
          
              this.queryList = [];
              querySnapshot.forEach((doc) => {
                this.queryList.push({ id: doc.id, ...doc.data() });
              });
          
            } catch (error) {
              console.error("Error querying posts by date:", error);
            }
          },

        async queryPostsByUser(userId) {
            try {
                const q = query(
                    collection(db, 'blogs'),
                    where('authorId', '==', userId),
                    orderBy('createdAt', 'desc') 
                );
  
                const querySnapshot = await getDocs(q);
                
                this.queryList = [];
                
                querySnapshot.forEach((doc) => {
                    const postData = {
                        id: doc.id,
                        ...doc.data()
                    };
                    this.queryList.push(postData);
                });
                
                return this.queryList;
                
            } catch (error) {
                console.error("Error querying posts by user:", error);
                throw error;
            }
        }
    }
})