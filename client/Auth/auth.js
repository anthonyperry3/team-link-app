//Put in firebase.js

// import { updateProfile, getAuth } from "firebase/auth"
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
// import { onAuthStateChanged } from 'firebase/auth';

// const auth = getAuth();
// const storage = getStorage()

//Custom Hook
// export function useAuth() {
//   const [currentUser, setCurrentUser] = useState();

//   useEffect (() => {
//   const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
//     return unsub;
//   }, []);
//   return currentUser;
// }

//Storage
// export async function upload(file, currentUser, setLoading) {
//   const fileRef = ref(storage, currentUser.uid + " .png");
//   setLoading(true);
//   const snapshot = await uploadBytes(fileRef, file);

//   const photoURL = await getDownloadURL(fileRef);

//   updateProfile(currentUser, {photoURL});
  
//   setLoading(false);
//   alert("Uploaded File")
// }