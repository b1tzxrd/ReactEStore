import { AuthInputs } from "@/components/AuthForms/AuthForm";
import { RegInputs } from "@/components/AuthForms/RegForm";
import { IFormInputs } from "@/components/pages/ProfileEdit/ProfileEdit";
import { toaster } from "@/components/ui/toaster";
import { ICartItem } from "@/types/cartTypes";
import { db } from "firebase";
import { getAuth, createUserWithEmailAndPassword, User, updateProfile, signOut, signInWithEmailAndPassword, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";


export const registerUser = async ({ email, password, name }: RegInputs): Promise<User> => {
    const auth = getAuth()

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await setDoc(doc(db, "cart", user.uid), { items: [] as ICartItem | [] })

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

export const updateDataUser = async (
    user: User,
    { displayName, email, photoURL }: Partial<IFormInputs>
): Promise<void> => {
    if (!user) throw new Error("Пользователь не найден")

    try {
        if (displayName?.length !== 0 && displayName !== user.displayName) {
            await updateProfile(user, { displayName: displayName?.trim() }).then(() => toaster.success({ title: "вы успешно поменли имя" })).catch(e => toaster.error({ title: e.message }))
        }

        if (photoURL !== user.photoURL) {
            await updateProfile(user, { photoURL: photoURL?.trim() }).then(() => toaster.success({ title: "вы успешно поменли аватар" })).catch(e => toaster.error({ title: e.message }))
        }

        if (!photoURL?.trim().length) {
            await updateProfile(user, { photoURL: '' }).then(() => toaster.success({ title: "вы успешно поменли аватар" })).catch(e => toaster.error({ title: e.message }))
        }

        if (email &&  user.email !== email && user.emailVerified) {
            await verifyBeforeUpdateEmail(user, email)
                .then(() => {
                    toaster.success({
                        title: "Вы обновили почту",
                        description: "Верификация почты - " + user.emailVerified
                    });
                })
                .catch((e) => {
                    console.log("Ошибка изменения почты - " + e.message)
                    toaster.error({
                        title: "Ошибка изменения почты - " + e.message
                    });
                });

        }

    } catch (error) {
        console.log("ERROR" + error)
    }
}