import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc } from "firebase/firestore/lite";
import { getAuth, browserLocalPersistence, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup,
    signOut, sendPasswordResetEmail  } from "firebase/auth";
import { firebaseConfig } from "./environment";

class FirebaseService {
    constructor() {
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(this.app);
        this.auth = getAuth(this.app, {
            persistence: browserLocalPersistence,
        });
        console.log("FirebaseService");
    }

    async getCourses() {
        const coursesCol = collection(this.db, "courses22");
        const coursesSnapshot = await getDocs(coursesCol);
        return coursesSnapshot.docs.map(doc => doc.data());
    }

    async saveUser(email, uid) {
        const usersRef = doc(this.db, "iit_users", uid);
        return setDoc(usersRef, { email }, { merge: true });
    }

    async login(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    async logout() {
        return await signOut(this.auth);
    }

    async loginWithGoogle() {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({
            'login_hint': '@nung.edu.ua'
        });
        return await signInWithPopup(this.auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                return result.user;
        }).catch((error) => {
            return error;
            });
    }

    async sendPasswordResetEmail(email) {
        return await sendPasswordResetEmail(this.auth, email);
    }
}

export const firebaseService = new FirebaseService();
