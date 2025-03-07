import { useState } from "react";
import { cartService } from "@/services/cartService";

export const useCart = () => {
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [visible, setVisible] = useState(false);

    const { data: cartItems = [], isLoading, isError, isSuccess } = cartService.useQueryCart();
    const { mutate: removeFromCart } = cartService.useRemoveFromCart();

    const toggleCheckboxVisibility = () => setVisible(prev => !prev);

    const toggleSelectedItems = (id: string) => {
        setSelectedItems(prev => 
            prev.includes(id) 
                ? prev.filter(item => item !== id) // Снимаем галку
                : [...prev, id]                    // Добавляем галку
        );
    };

    const selectAllItems = () => {
        if (selectedItems.length === cartItems.length) {
            setSelectedItems([]); // Если уже все выбраны — снимаем все
        } else {
            setSelectedItems(cartItems.map(item => item.id)); // Иначе выбираем все
        }
    };

    const removeSelectedItems = () => {
        selectedItems.forEach(cartItemId => {
            const cartItem = cartItems.find(item => item.id === cartItemId);
            if (cartItem?.gameId) {
                removeFromCart(cartItem.gameId, {
                    onSuccess: () => {
                        setSelectedItems(prev => prev.filter(item => item !== cartItemId));
                    }
                });
            }
        });
    };

    const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
    const selectedItemsTotalAmount = cartItems
    .filter(item => selectedItems.includes(item.id))
    .reduce((sum, item) => sum + item.price, 0);

    return {
        cartItems,
        isLoading,
        isError,
        isSuccess,
        selectedItems,
        visible,
        toggleCheckboxVisibility,
        toggleSelectedItems,
        selectAllItems,
        removeSelectedItems,
        totalAmount,
        selectedItemsTotalAmount
    };
};
