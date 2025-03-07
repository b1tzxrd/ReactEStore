import { db } from "../../firebase"; // Убедись, что путь к firebase правильный
import { IProduct } from "@/types/productsTypes";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

// Получить все продукты
export const getProducts = async (): Promise<IProduct[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    })) as IProduct[];
};

// Получить один продукт по ID
export const getProduct = async (id: string): Promise<IProduct> => {
    if (!id) throw new Error("ID продукта отсутствует");

    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) throw new Error("Продукт не найден");

    return { id: docSnap.id, ...docSnap.data() } as IProduct;
};
