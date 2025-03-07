import { VStack, Heading, Grid, GridItem, Link, Image, HStack, Flex } from "@chakra-ui/react"
import xbox from "../../assets/xbox.png"
import playstation from "../../assets/playstationBlack.png"
import pc from "../../assets/pcLogo.png"
import { FaXbox, FaPlaystation, FaLaptopCode } from "react-icons/fa";
import { useColorMode } from "../ui/color-mode";
import { NavLink } from "react-router-dom";

const Categories = () => {
    const { colorMode } = useColorMode();

    const categories = [
        {
            title: "Xbox",
            platform: "xbox",
            image: xbox,
            icon: FaXbox
        },
        {
            title: "PlayStation",
            platform: "ps",
            image: playstation,
            icon: FaPlaystation
        },
        {
            title: "PC",
            platform: "pc",
            image: pc,
            icon: FaLaptopCode
        }
    ];

    return (
        <VStack as="section" mt={{ base: 20, md: 40 }}>
            <Heading
                as="h2"
                size="4xl"
                bgClip="text"
                bgGradient="to-r"
                gradientFrom="teal.500"
                gradientTo="cyan.400"
            >
                Категории
            </Heading>
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} maxW="full">
                {categories.map(({ title, platform, image, icon: Icon }) => (
                    <NavLink to={`/products/${platform}`} key={title}>
                        <GridItem key={title} maxW="300px" transition="0.2s" _hover={{ transform: "scale(1.05)", transition: "0.2s" }} >
                            <Link textDecor="none">
                                <Flex
                                    p={4}
                                    bgColor={colorMode === "dark" ? "gray.700" : "white"}
                                    borderRadius="md"
                                    boxShadow={colorMode === "dark" ? "none" : "md"}
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="space-between"
                                >
                                    <Flex w="full" justifyContent="center" flex="1">
                                        <Image
                                            rounded={5}
                                            src={image}
                                            alt={title}
                                            w="100%"
                                            objectFit="contain"
                                        />
                                    </Flex>
                                    <HStack p={2} >
                                        <Icon size={20} />
                                        <Heading fontSize="lg" fontWeight="bold">{title}</Heading>
                                    </HStack>
                                </Flex>
                            </Link>
                        </GridItem>
                    </NavLink>
                ))}
            </Grid>
        </VStack>
    );
}

export default Categories;
