import { VStack, Grid, GridItem, IconButton, Image, Text, Heading, Flex, Box, HStack } from "@chakra-ui/react"
import ghost from "../../assets/ghost.webp"
import gta5ps5 from "../../assets/gta5ps5.webp"
import cyberpunk_2077 from "../../assets/cyberpunk_2077.webp"
import ronin from "../../assets/ronin.webp"
import { FaShoppingCart } from "react-icons/fa"
import { MdFavoriteBorder } from "react-icons/md"
import { useColorMode } from "../ui/color-mode"
import { Link } from "react-router-dom"


const PopularGoods = () => {


    const goods = [
        {
            id: 2,
            title: "Ghost of Tsushima",
            description: "Игра для PS5",
            price: "32 990 ₸",
            image: ghost
        },
        {
            id: 1,
            title: "GTA 5",
            description: "Игра для PS5",
            price: "32 990 ₸",
            image: gta5ps5
        },
        {
            id: 3,
            title: "Cyberpunk 2077",
            description: "Игра для PS5",
            price: "32 990 ₸",
            image: cyberpunk_2077
        },
        {
            id: 4,
            title: "Ronin",
            description: "Игра для PS5",
            price: "32 990 ₸",
            image: ronin
        }
    ]

    const { colorMode } = useColorMode()

    return (
        <VStack as="section" spaceY={7} mt={{ base: 20, md: 40 }}>
            <Heading
                as="h2"
                size="4xl"
                bgClip="text"
                bgGradient="to-r"
                gradientFrom="teal.500"
                gradientTo="cyan.400" >
                Популярные товары
            </Heading>
            <Grid
                templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                gap={6} >
                {
                    goods.map(({ id, title, description, price, image }) => (
                        <GridItem maxW="300px" key={title} transition="0.2s" _hover={{ transform: "scale(1.05)", transition: "0.2s" }} >
                            <Link to={`single-product/${id}`} >
                                <Box p={2} bgColor={"white"} borderRadius="md" backgroundColor={colorMode === "dark" ? "bg.muted" : "Background"} boxShadow="lg" >
                                    <Flex w="full" justifyContent="center" >
                                        <Image src={image} alt={title} w="100%" rounded={5} />
                                    </Flex>
                                    <Box p={2}>
                                        <Heading fontSize="xl" fontWeight="bold" >{title}</Heading>
                                        <Text fontSize="lg" color="gray.500">{description}</Text>
                                        <Flex justifyContent="space-between" alignItems="center" mt={4}>
                                            <Text
                                                fontSize="2xl"
                                                fontWeight="bold"
                                                bgClip="text"
                                                bgGradient="to-r"
                                                gradientFrom="teal.500"
                                                gradientTo="cyan.400">{price} </Text>
                                            <HStack>
                                                <IconButton colorPalette="teal" aria-label="Add to cart" variant="outline" >
                                                    <FaShoppingCart />
                                                </IconButton>
                                                <IconButton colorPalette="red" aria-label="Add to cart" variant="outline" >
                                                    <MdFavoriteBorder />
                                                </IconButton>
                                            </HStack>
                                        </Flex>
                                    </Box>
                                </Box>
                            </Link>
                        </GridItem>
                    ))
                }
            </Grid>
        </VStack >
    )
}

export default PopularGoods


