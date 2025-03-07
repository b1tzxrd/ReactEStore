import { addToCart, getCart, removeFromCart } from "@/api/cart";
import { ICartItem } from "@/types/cartTypes"; 
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";
import { toaster } from "@/components/ui/toaster";


export const cartService = {
    useQueryCart: () => {
        const { user } = useAuth()
        return useQuery({
            queryKey: ["cart", user?.uid],
            queryFn: () => getCart(user?.uid || ""),
            enabled: !!user?.uid,
        })
    },
    useAddToCart: () => {
        const queryClient = useQueryClient()
        const { user } = useAuth()

        return useMutation({
            mutationFn: (item: ICartItem) => {
                if (!user?.uid) {
                    toaster.error({
                        title: "Пользователь не авторизирован!",
                        description: "Пожалуйста, авторизируйтесь или зарегестрируйтесь, чтобы добавить товар в корзину"
                    });
                    throw new Error("User not authenticated");
                }
                return addToCart(item, user.uid);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({queryKey:['cart', user?.uid]});
            },
            onError: (error) => {
                toaster.error({
                    title: "Ошибка добавления товара в корзину",
                    description: error.message
                });
            }
        });
    },
    useRemoveFromCart: () => {
        const queryClient = useQueryClient()
        const { user } = useAuth()
        return useMutation({
            mutationFn: (gameId: string) => {
                if (!user?.uid) {
                    throw new Error("User not authenticated");
                }
                return removeFromCart(gameId, user.uid);
            },
            onSuccess: (deletedItemId) => {
                toaster.success({
                    title: "Товар удален из корзины",
                });
                queryClient.setQueryData(["cart"], (oldCartItems: ICartItem[] | undefined) => {
                    return oldCartItems ? oldCartItems.filter(item => item.id !== deletedItemId) : [];
                });
                queryClient.invalidateQueries({queryKey:['cart', user?.uid]});
                
            },
        })
    }
}