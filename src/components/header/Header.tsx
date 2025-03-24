import { Box, Flex, Heading, Container, HStack, Image, IconButton, chakra, Avatar } from "@chakra-ui/react";
import HeaderBurger from "../headerBurger/HeaderBurger";
import { ColorModeToggle } from "../colorThemeTrigger/color-mode-toggle";
import Logo from "../../assets/react-logo.svg"
import Cart from "../Cart/Cart";
import Favorite from "../Favorite/Favorite";
import AuthMenu from "../AuthForms/AuthMenu";
import AuthGroupBtns from "../AuthForms/AuthGroupBtns";
import SearchBarDesk from "../SearchBar/SearchBarDesk";
import SearchBarMobile from "../SearchBar/SearchBarMobile";
import { authService } from '@/services/authService';
import useAuth from "@/hooks/useAuth";
import { MdLogout } from "react-icons/md";
import { Link as RouterLink } from "react-router-dom"
import { Link } from "react-router-dom";


const ChakraRouterLink = chakra(RouterLink)

const Header: React.FC = () => {

    const { user } = useAuth()
    const { mutate: logout } = authService.useLogoutMutation()



    return (
        <>
            <Box as="header" py={3} maxH="90" bg="Background" >
                <Container maxW="8xl">
                    <Flex align="center" justify="space-between">
                        <HStack gapX={2} align="center">
                            <HeaderBurger />
                            <ChakraRouterLink to="/" textDecor="none" display="flex" alignItems="center" aria-label="Go to homepage" >
                                <Image src={Logo} maxW="40px" alt="ReactEstore Logo" />
                                <Heading
                                    as="h1"
                                    size="xl"
                                    bgClip="text"
                                    bgGradient="to-l"
                                    gradientFrom="teal.500"
                                    gradientTo="cyan.400"
                                    display={{ base: "none", sm: "inline" }} >
                                    ReactEstore
                                </Heading>
                            </ChakraRouterLink>
                        </HStack>
                        <SearchBarDesk />
                        <HStack align="center" gapX={{ base: 0, sm: 2 }}>
                            {user ? (
                                <>
                                    <ColorModeToggle />
                                    <Link to={"/profile"} >
                                        <Avatar.Root colorPalette={!user.photoURL ? "teal" : "transparent"} variant="solid" size="sm" >
                                            <Avatar.Fallback name={user?.displayName || "Без имени"} />
                                            {user.photoURL && <Avatar.Image src={user?.photoURL}  objectFit={"contain"} />}
                                        </Avatar.Root>
                                    </Link>
                                    <IconButton onClick={() => logout()} bgColor="transparent" color="tomato" variant="solid" size="sm">
                                        <MdLogout />
                                    </IconButton>
                                </>
                            ) : (
                                <>
                                    <AuthMenu />
                                    <ColorModeToggle />
                                    <AuthGroupBtns />
                                </>
                            )}
                            <Cart />
                            <Favorite />
                        </HStack>
                    </Flex>
                    <SearchBarMobile />
                </Container>
            </Box>
            <hr />
        </>
    );
};

export default Header;