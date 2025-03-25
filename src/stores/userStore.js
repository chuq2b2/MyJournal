import { defineStore } from 'pinia'
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { db, auth } from '@/firebase/init'

export const useUserStore = defineStore('user-store', {
  state: () => ({
    userName: '',
    userEmail: '',
    userBio: '',
    userId: '',
    signUpSuccess: false,
    signUpError: '',
    signInSuccess: false,
    signInError: '',
  }),

  getters: {
    getUserName: (state) => state.userName,
    getUserEmail: (state) => state.userEmail,
    getUserBio: (state) => state.userBio,
    getUserId: (state) => state.userId,
    getSignUpSuccess: (state) => state.signUpSuccess,
    getSignUpError: (state) => state.signUpError,
    getSignInSuccess: (state) => state.signInSuccess,
    getSignInError: (state) => state.signInError,
  },

  actions: {
    async updateUserProfile(newUserName, newUserBio) {
      const user = auth.currentUser; // Get the current logged-in user
      if (user) {
        const userRef = doc(db, "users", user.uid);

        await setDoc(userRef, {
          userName: newUserName,
          userBio: newUserBio,
        }, { merge: true }); // Use merge: true to only update specified fields without overwriting others
      }
    },

    async getUserProfile() {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          this.userName = userData.userName;
          this.userBio = userData.userBio;
          this.userId = user.uid;
        } else {
          console.log("No such document!");
          this.userName = user.email;
          this.userEmail = user.email;
          this.userBio = '';
          this.userId = user.uid;
        }
      }
    },

    async addNewUserToDB(name, email, userId) {
      try {
        const docRef = doc(db, 'users', userId);

        await setDoc(docRef, {
            userName: name, 
            userEmail: email,
            userBio: '',
        });
          console.log('Document written with ID: ', docRef.id);
      } catch (error) {
          console.error('Error adding document: ', error);
      }
  },
    async userSignUp(signInObj) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          signInObj.email,
          signInObj.password
        )
        this.userName = userCredential.user.email
        this.userEmail = userCredential.user.email
        this.userId = userCredential.user.uid
        this.signUpSuccess = true
        this.signUpError = ''
        await this.addNewUserToDB(this.userName, this.userEmail, this.userId)
        alert(`Successful sign up for ${this.userEmail}`)
      } catch (error) {
        this.signUpSuccess = false
        this.signUpError = error.message
        console.log(error)
        throw error
      }
    },

    async userSignIn(signInObj) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, signInObj.email, signInObj.password)
        const user = userCredential.user
        this.userName = user.email
        this.userEmail = user.email
        this.userId = user.uid 
        await this.getUserProfile();
        this.signInSuccess = true
        this.signInError = ''
        alert(`Successful sign in for ${user.email}`)
        this.router.push('/');
      } catch (error) {
        console.log(error.code, error.message)
        this.signInError = error.message
        this.signInSuccess = false
      }
    },

    logout() {
      this.signInSuccess = false;
      this.userName = '';
      this.userEmail = '';
      this.userBio = '';
      this.userId = '';  
      auth.signOut();
    },
  }
})