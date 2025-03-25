# My Journal

My Journal is a blog where you can share your funny stores and see others as well. 

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Add your Firebase Auth by making a /src/firebase/init.js

```sh
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// Firebase configuration
const firebaseConfig = {
  apiKey: <INSERT YOUR API KEY>,
  authDomain: <INSERT YOUR AUTH DOMAIN>,
  projectId: <INSERT PROJECT ID>,
  storageBucket: <INSERT STORAGE BUCKEt>,
  messagingSenderId: <INSERT MESSAGING SENDER ID>,
  appId: <INSERT APP ID>
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { db, auth };
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
