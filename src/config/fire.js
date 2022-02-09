import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore'

const firebaseConfig = ({
  apiKey: "AIzaSyA8LZ7KCBLK66qrAs1D8_ww8723ZCBQCzk",
  authDomain: "k-cloud-c87c2.firebaseapp.com",
  projectId: "k-cloud-c87c2",
  storageBucket: "k-cloud-c87c2.appspot.com",
  messagingSenderId: "773711389964",
  appId: "1:773711389964:web:4e44df7b61cda1df445529",
  measurementId: "G-4LT9RV8WEP"
});

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
// const firestore = firebaseConfig.firestore()




const firebaseApp = firebase.initializeApp(firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
// const auth = firebase.auth();
export  const database ={
  folders: db.collection('folders'),
  files: db.collection('files'),
  formatDoc: doc=>{
    return { id:doc.id, ...doc.data()}
  },
  getCurrentTimestamp: firebase.firestore.FieldValue.serverTimestamp
}
export const storage = firebase.storage()

// export { auth, db,firebaseApp };
export default firebase;