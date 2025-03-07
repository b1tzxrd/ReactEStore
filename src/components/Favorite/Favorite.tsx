"use client"

import { Badge, Box, Button, Card, Image, Heading, HStack, IconButton, Stack, Text } from "@chakra-ui/react"
import {
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerRoot,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Checkbox } from "@/components/ui/checkbox"
import gta5 from "../../assets/gta5ps5.webp"
import ghost from "../../assets/ghost.webp"
import cyberpunk_2077 from "../../assets/cyberpunk_2077.webp"
import ronin from "../../assets/ronin.webp"
import { EmptyState } from "../ui/empty-state";
import { MdDeleteForever, MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";
import { useState } from "react";
import { FaPlaystation, FaXbox, FaLaptop } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const favoriteItems = [
    {
        id: 1,
        title: "GTA 5",
        platform: FaPlaystation,
        colorPalette: "blue",
        genre: "экшн",
        price: 25990,
        image: gta5,
    },
    {
        id: 2,
        title: "Ghost of Tsushima",
        platform: FaXbox,
        colorPalette: "green",
        genre: "экшн",
        price: 37990,
        image: ghost,
    },
    {
        id: 3,
        title: "Cyberpunk 2077",
        platform: FaLaptop,
        colorPalette: "teal",
        genre: "экшн",
        price: 2150,
        image: cyberpunk_2077,
    },
    {
        id: 4,
        title: "Ronin",
        platform: FaPlaystation,
        colorPalette: "blue",
        genre: "экшн",
        price: 37990,
        image: ronin,
    },
    {
        id: 5,
        title: "Ronin",
        platform: FaPlaystation,
        colorPalette: "blue",
        genre: "экшн",
        price: 37990,
        image: ronin,
    },
    {
        id: 6,
        title: "Ronin",
        platform: FaPlaystation,
        colorPalette: "blue",
        genre: "экшн",
        price: 37990,
        image: ronin,
    },
    {
        id: 7,
        title: "Ronin",
        platform: FaPlaystation,
        colorPalette: "blue",
        genre: "экшн",
        price: 37990,
        image: ronin,
    },
    {
        id: 8,
        title: "Ronin",
        platform: FaPlaystation,
        colorPalette: "blue",
        genre: "экшн",
        price: 37990,
        image: ronin,
    },
]

const Favorite = () => {

    const [visble, setVisible] = useState<boolean>(false)
    const [count] = useState<number>(favoriteItems.length)

    const toggleCheckboxVisibility = () => {
        setVisible(!visble)
    }

    return (
        <DrawerRoot size="sm">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <Box position="relative" >
                    <IconButton variant="ghost" size={{ base: "xs", sm: "md" }} >
                        <MdFavoriteBorder />
                    </IconButton>
                    {count > 0 && (
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
                            {count}
                        </Badge>
                    )}
                </Box>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerBody pos="relative">

                    <HStack mb={5}>
                        <Heading
                            as="h2"
                            size="2xl"
                            bgClip="text"
                            bgGradient="to-r"
                            gradientFrom="teal.500"
                            gradientTo="cyan.400"  >Избранное</Heading>
                        <Button variant="plain" _hover={{ color: "teal.400" }} onClick={toggleCheckboxVisibility} >Выбрать</Button>
                    </HStack>
                    <HStack mb={5} display={visble ? "flex" : "none"} >
                        <Button colorPalette="cyan" variant="solid" >Выбрать все</Button>
                        <Button colorPalette="red" variant="ghost" >Удалить</Button>
                    </HStack>
                    <Stack mb={100} >
                        {!favoriteItems.length ?

                            <EmptyState
                                icon={<MdFavorite color="red" />}
                                title="Ваш список избранного пуст"
                                description="Ознакомьтесь с нашими продуктами и добавьте товары в список избранного"
                            />

                            : favoriteItems.map(({ id, title, platform: Platform, genre, price, image, colorPalette }) => (
                                <Card.Root flexDirection="row" overflow="hidden" size="sm" key={id} pos="relative" boxShadow="lg" >
                                    <Checkbox colorPalette="teal" variant="solid" pos="absolute" top={2} right={5} display={visble ? "inline-flex" : "none"} ></Checkbox>
                                    <Image
                                        objectFit={{ base: "contain", md: "cover" }}
                                        maxW={{ base: "110px", sm: "150px" }}
                                        maxH="full"
                                        src={image}
                                        alt={title}
                                    />
                                    <Box>
                                        <Card.Body gap={1} mt={visble ? 4 : 0} >
                                            <Card.Title>{title}</Card.Title>
                                            <HStack >
                                                <Badge colorPalette={colorPalette} >< Platform /></Badge>
                                                <Badge colorPalette="cyan" > {genre} </Badge>
                                            </HStack>
                                            <Text>{price} ₸</Text>
                                        </Card.Body>
                                        <Card.Footer p={2} >
                                            <Button colorPalette="cyan" variant="outline" size="xs" ><IoCartOutline /></Button>
                                            <Button colorPalette="red" size="xs" variant="outline" ><MdDeleteForever color="red" /></Button>
                                        </Card.Footer>
                                    </Box>
                                </Card.Root>
                            ))}
                    </Stack>
                    <Box pos="fixed" bottom="5">
                        <Button bgColor="teal.500" color="white" variant="subtle" mt={5} size="lg" >Добавить в корзину - {favoriteItems.length} шт.</Button>
                    </Box>
                </DrawerBody>
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default Favorite






