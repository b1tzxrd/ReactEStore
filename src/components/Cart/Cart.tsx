"use client"

import { Badge, Box, Button, Heading, HStack, IconButton, Stack } from "@chakra-ui/react"
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { FiShoppingCart } from "react-icons/fi";
import { EmptyState } from "../ui/empty-state";
import { LuShoppingCart } from "react-icons/lu";
import useAuth from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import CartItemCard from "./CartItemCard";
import CartItemCardSkeleton from "../Skeletons/CartItemCardSkeleton";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toaster } from "../ui/toaster";

// const cartItems = [
//     {
//         id: 1,
//         title: "GTA 5",
//         platform: FaPlaystation,
//         colorPalette: "blue",
//         genre: "экшн",
//         price: 25990,
//         image: gta5,
//     },
//     {
//         id: 2,
//         title: "Ghost of Tsushima",
//         platform: FaXbox,
//         colorPalette: "green",
//         genre: "экшн",
//         price: 37990,
//         image: ghost,
//     },
//     {
//         id: 3,
//         title: "Cyberpunk 2077",
//         platform: FaLaptop,
//         colorPalette: "teal",
//         genre: "экшн",
//         price: 2150,
//         image: cyberpunk_2077,
//     },
//     {
//         id: 4,
//         title: "Ronin",
//         platform: FaPlaystation,
//         colorPalette: "blue",
//         genre: "экшн",
//         price: 37990,
//         image: ronin,
//     },
//     {
//         id: 5,
//         title: "Ronin",
//         platform: FaPlaystation,
//         colorPalette: "blue",
//         genre: "экшн",
//         price: 37990,
//         image: ronin,
//     },
//     {
//         id: 6,
//         title: "Ronin",
//         platform: FaPlaystation,
//         colorPalette: "blue",
//         genre: "экшн",
//         price: 37990,
//         image: ronin,
//     },
//     {
//         id: 7,
//         title: "Ronin",
//         platform: FaPlaystation,
//         colorPalette: "blue",
//         genre: "экшн",
//         price: 37990,
//         image: ronin,
//     },
//     {
// id: 8,
// title: "Ronin",
// platform: FaPlaystation,
// colorPalette: "blue",
// genre: "экшн",
// price: 37990,
// image: ronin,
//     },
// ]


const Cart = () => {

    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const {
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
    } = useCart()


    const { user } = useAuth()
    const { mutate: createOrder } = useMutation({
        mutationFn: async (selected: boolean) => await handleCheckout(selected),
        onSuccess: (order) => {
            queryClient.invalidateQueries({ queryKey: ["cart", user?.uid] });
            toaster.success({ title: "Заказ создан! Перенаправляем на оплату..." });
            navigate(`/checkout/${order?.id}`);
        },
        onError: (error) => {
            console.error("Ошибка при создании заказа:", error);
            toaster.error({ title: "Не удалось создать заказ" });
        }
    })

    const handleCheckout = async (selected: boolean) => {
        const itemsToCheckout = selected
            ? cartItems.filter(item => selectedItems.includes(item.id))
            : cartItems;

        if (itemsToCheckout.length === 0) return;

        const createOrder = await addDoc(collection(db, `orders/${user?.uid}/userOrders`), {
            userId: user?.uid,
            items: itemsToCheckout,
            total: selected ? selectedItemsTotalAmount : totalAmount,
            createdAt: serverTimestamp(),
            status: "pending"
        })

        return createOrder
        // if (createOrder) {navigate(`/checkout/${createOrder.id}`);}
    }

    return (
        <DrawerRoot size="sm">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Box position="relative" >
                    <IconButton variant="ghost" size={{ base: "xs", sm: "md" }}>
                        <FiShoppingCart />
                    </IconButton>
                    {cartItems?.length > 0 && (
                        <Badge
                            position="absolute"
                            top="-1"
                            right="-1"
                            bg="teal.500"
                            color="white"
                            borderRadius="full"
                            px={{ sm: "2" }}
                            fontSize="xs"
                        >
                            {cartItems?.length}
                        </Badge>
                    )}
                </Box >
            </DrawerTrigger>
            <DrawerContent>
                <DrawerBody pos="relative" >
                    <HStack mb={5}>
                        <Heading
                            as="h2"
                            size="2xl"
                            bgClip="text"
                            bgGradient="to-r"
                            gradientFrom="teal.500"
                            gradientTo="cyan.400"  >Корзина</Heading>
                        <Button variant="plain" _hover={{ color: "teal.400" }} onClick={toggleCheckboxVisibility} >Выбрать</Button>
                    </HStack>
                    <HStack mb={5} display={visible ? "flex" : "none"} >
                        <Button onClick={selectAllItems} disabled={cartItems.length === 0} colorPalette="cyan" variant="solid" >{selectedItems.length === cartItems.length ? "Снять все" : "Выбрать все"}</Button>
                        <Button onClick={removeSelectedItems} disabled={cartItems.length === 0} colorPalette="red" variant="ghost" >Удалить</Button>
                    </HStack>
                    <Stack mb={100} >
                        {isError ? (
                            <Heading
                                as="h2"
                                size="xl"
                                bgClip="text"
                                bgGradient="to-r"
                                gradientFrom="teal.500"
                                gradientTo="cyan.400" >Ошибка загрузки товаров. Пегезагрузите страницу или попробуйте позже</Heading>
                        ) : isLoading ? (
                            <CartItemCardSkeleton />
                        )

                            : !!user === false ? (
                                <EmptyState
                                    icon={<LuShoppingCart color="teal" />}
                                    title="Войдите в аккаунт или зарегестриуйтесь"
                                    description="Чтобы добавить товары в корзину"
                                />
                            ) : !cartItems?.length ?

                                <EmptyState
                                    icon={<LuShoppingCart color="teal" />}
                                    title="Ваша корзина пуста"
                                    description="Ознакомьтесь с нашими продуктами и добавьте товары в корзину"
                                />

                                : isSuccess && cartItems.map((item) => (
                                    <CartItemCard
                                        key={item.id}
                                        item={item}
                                        isSelected={selectedItems.includes(item.id)}
                                        onSelect={() => toggleSelectedItems(item.id)}
                                        checkboxVisible={visible}
                                    />
                                ))}
                    </Stack>
                    <Box pos="fixed" bottom="5">
                        {visible ? (
                            <Button
                                disabled={selectedItems.length === 0}
                                bgColor="teal.500"
                                color="white"
                                size="lg"
                                w="full"
                                onClick={() => createOrder(true)} >
                                {`Выбрано ${selectedItems.length} шт. К оформлению ${(selectedItemsTotalAmount || 0).toLocaleString()} ₸`}
                            </Button>
                        ) : (
                            <Button
                                disabled={cartItems.length === 0}
                                bgColor="teal.500"
                                color="white"
                                size="lg"
                                w="full"
                                onClick={() => createOrder(false)} >
                                {`К оформлению ${cartItems.length} шт., ${totalAmount.toLocaleString()} ₸`}
                            </Button>
                        )}
                    </Box>
                </DrawerBody>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default Cart
