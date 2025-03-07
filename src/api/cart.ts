import { ICartItem } from "@/types/cartTypes"
import { toaster } from "@/components/ui/toaster"
import { collection, deleteDoc, doc,getDocs, setDoc} from "firebase/firestore"
import { db } from "../../firebase"

export const getCart = async (userId: string) => {
    const itemsCollectionRef = collection(db, "cart", userId, "items");

    try {
        const snapshot = await getDocs(itemsCollectionRef);
        const items = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        return items as ICartItem[]; // это будет массив игр в корзине
    } catch (error) {
        console.error("Ошибка при получении корзины:", error);
        throw error; // можно пробросить дальше или обработать
    }
};


export const addToCart = async (item: ICartItem, userId: string): Promise<void> => {
    const docRef = doc(db, "cart", userId, "items", item.gameId);
    
    try {
        await setDoc(docRef, item as ICartItem, { merge: true });
        toaster.success({
            title: `${item.name} добавлен в корзину`,
        });
    } catch (error) {
        toaster.error({
            title: `ошибка - ${error}`
        });
    }
};

export const removeFromCart = async (id: string, userId: string): Promise<string> => {
    const docRef = doc(db, "cart", userId, "items", id);
    await deleteDoc(docRef);
    return id;
};


