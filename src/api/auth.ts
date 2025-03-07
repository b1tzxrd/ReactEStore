import { AuthInputs } from "@/components/AuthForms/AuthForm";
import { RegInputs } from "@/components/AuthForms/RegForm";
import { ICartItem } from "@/types/cartTypes";
import { db } from "firebase";
import { getAuth, createUserWithEmailAndPassword, User, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


export const registerUser = async ({ email, password, name }: RegInputs): Promise<User> => {
    const auth = getAuth()

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await setDoc(doc(db, "cart", user.uid), {items: [] as ICartItem | []})  

    if (name) {
        await updateProfile(user, { displayName: name })
    }

    return user
}

export const authorizationUser = async ({ email, password }: AuthInputs): Promise<User> => {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
}

// export const getCurrentUser = (): Promise<User | null> => {
//     return new Promise((resolve) => {
//         const auth = getAuth();
//         const unsubscribe = onAuthStateChanged(auth, (user) => {
//             unsubscribe();
//             resolve(user);
//         });
//     });
// };


export const logoutUser = async () => {
    try {
        const auth = getAuth();
        await signOut(auth);
        console.log("Пользователь вышел");
    } catch (error) {
        console.error("Ошибка при выходе", error);
    }
};