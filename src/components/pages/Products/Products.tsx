import { Container, Grid, GridItem, Image, Text, Heading, Box, HStack, Flex, IconButton, Badge } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"
import { FaLaptopCode, FaPlaystation, FaXbox } from "react-icons/fa"
import { MdFavoriteBorder } from "react-icons/md"
import { useColorMode } from "@/components/ui/color-mode"
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/api/products"
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from "@/components/ui/toaster"
import { cartService } from "@/services/cartService"
import SkeletonCard from "@/components/Skeletons/SkeletonProducts"
import { LuShoppingCart } from "react-icons/lu"

const Products: React.FC = () => {


    const { colorMode } = useColorMode()
    const { mutate: addToCart } = cartService.useAddToCart()

    const { platform } = useParams<{platform?: "ps" | "xbox" | "pc"}>()

    const query = useQuery({
        queryKey: ["products"],
        queryFn: getProducts,
    })



    const shortText = (text: string | undefined | null, size: number) => {
        if (!text) return "Без названия"; 
        return text.length > size ? text.substring(0, size) + "..." : text;
    };

    const filterdProducts = platform ? query.data?.filter((product) => product.platform === platform) : query.data


    return (
        <Box bgColor="Background">
            <Toaster />
            <Container p={{ base: 1, md: 10 }} minH="100vh" pos="relative" >
                <Heading
                    as="h2"
                    size="4xl"
                    bgClip="text"
                    bgGradient="to-r"
                    gradientFrom="teal.500"
                    gradientTo="cyan.400"
                    textAlign="center" >
                    Игры на все платформы
                </Heading>
                <Grid
                    mt={10}
                    templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
                    gap={{ base: 2, md: 6 }}
                    justifySelf="center"
                    alignItems="center" >
                    {
                        query.isLoading || query.isFetching || query.isPending ? (
                            Array.from({ length: 8 }).map((_, index) => (
                                <GridItem key={index} minW={"150px"} maxW={{ base: "180px", sm: "300px", md: "300px" }} >
                                    <SkeletonCard />
                                </GridItem>
                            ))
                        ) : filterdProducts?.map(({ id, name, platform, genre, colorPalette, price, image }) => (
                            <GridItem h="100%" maxW={{ base: "150px", sm: "235px", md: "300px" }} key={name} transition="0.2s" _hover={{ transform: "scale(1.05)", transition: "0.2s" }}  >

                                <Flex h="100%" flexDir="column" justifyContent="space-between" minH="285px" gap={3} p={1} bgColor={"white"} borderRadius="md" backgroundColor={colorMode === "dark" ? "bg.muted" : "Background"} boxShadow="lg" >
                                    <Flex w="full" justifyContent="center" h={{base: "150px", md: "300px"}} >
                                        <Link to={`../single-product/${id}`} style={{ width: "100%" }} >
                                            <Image src={image} alt={name} w="100%" h={"100%"} objectFit="contain" rounded={5} />
                                        </Link>
                                    </Flex>

                                    <Heading fontSize={{ base: "sm", md: "xl" }} fontWeight="bold" lineHeight="1.2" minH="40px" >{shortText(name, 20)}</Heading>
                                    <HStack>
                                        <Badge size={{ base: "sm", md: "lg" }} colorPalette={colorPalette} >{platform === "ps" ? <FaPlaystation /> : platform == "xbox" ? <FaXbox /> : <FaLaptopCode />}</Badge>
                                        <Badge size={{ base: "sm", md: "lg" }} colorPalette="teal" fontSize={"xs"}>{shortText(genre, 12)}</Badge>
                                    </HStack>
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Text
                                            fontSize={{ base: "xs", md: "2xl" }}
                                            fontWeight="bold"
                                            bgClip="text"
                                            bgGradient="to-r"
                                            gradientFrom="teal.500"
                                            gradientTo="cyan.400">{price} ₸</Text>
                                        <HStack>
                                            <IconButton onClick={() => {
                                                addToCart({ id: uuidv4(), gameId: id, name, platform, genre, colorPalette, price, image })
                                            }} size={{ base: "xs", md: "md" }} colorPalette="teal" aria-label="Add to cart" variant="ghost" >
                                                <LuShoppingCart />
                                            </IconButton>
                                            <IconButton size={{ base: "xs", md: "md" }} colorPalette="red" aria-label="Add to cart" variant="ghost" >
                                                <MdFavoriteBorder />
                                            </IconButton>
                                        </HStack>
                                    </Flex>
                                </Flex>
                            </GridItem>
                        ))
                    }
                </Grid>
            </Container>
        </Box >
    )
}

export default Products



