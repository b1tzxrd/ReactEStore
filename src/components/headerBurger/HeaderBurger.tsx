import { useState } from "react"
// import { Button } from "@/components/ui/button"
import {
    // DrawerActionTrigger,
    DrawerBackdrop,
    DrawerBody,
    DrawerCloseTrigger,
    DrawerContent,
    // DrawerFooter,
    DrawerHeader,
    DrawerRoot,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { HamburgerIcon } from "@chakra-ui/icons/Hamburger"
import { HStack, IconButton, List } from "@chakra-ui/react"
import { useColorMode } from "../ui/color-mode"
// import { color } from "framer-motion"
import { FaXbox, FaPlaystation, FaLaptopCode } from 'react-icons/fa';
import { NavLink } from "react-router-dom"
import { LuGamepad2 } from "react-icons/lu"
// import { chakra } from "@chakra-ui/react"


const isActiveNavLink = ({ isActive }: { isActive: boolean }) => ({
    textDecoration: "none",
    color: isActive ? "teal" : "inherit",
    fontWeight: isActive ? "bold" : "normal"
})

const HeaderBurger: React.FC = () => {
    const [open, setOpen] = useState(false)
    const { colorMode } = useColorMode()

    // const ChakraRouterLink = chakra(RouterLink, {
    //     shouldForwardProp: (prop) => !["isActive"].includes(prop)
    // })

    return (
        <DrawerRoot open={open} onOpenChange={(e) => setOpen(e.open)} placement="start">
            <DrawerBackdrop />
            <DrawerTrigger asChild>
                <IconButton
                    aria-label="Open menu"
                    rounded="full"
                    size={{ base: "xs", sm: "lg" }}
                    variant={{ base: "ghost", lg: "outline" }}
                    _hover={colorMode === "dark" ? { border: "1px solid teal", color: "teal.200" } : {}}
                >
                    <HamburgerIcon />
                </IconButton>

            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Категории</DrawerTitle>
                </DrawerHeader>
                <DrawerBody display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <List.Root listStyle="none" rowGap={4} fontSize="30px">
                        <List.Item>
                            <NavLink onClick={() => setOpen(false)} to="/products" end style={isActiveNavLink} >
                                <HStack _hover={{ color: "teal.300", textDecor: "none" }} >
                                    <LuGamepad2 />
                                    Все игры
                                </HStack>
                            </NavLink>
                        </List.Item>
                        <List.Item>
                            <NavLink to="/products/ps" style={isActiveNavLink} >
                                <HStack onClick={() => setOpen(false)} _hover={{ color: "teal.300", textDecor: "none" }} >
                                    <FaPlaystation />
                                    PlayStation
                                </HStack>
                            </NavLink>
                        </List.Item>
                        <List.Item>
                            <NavLink to="/products/xbox" style={isActiveNavLink} >
                                <HStack onClick={() => setOpen(false)} _hover={{ color: "teal.300", textDecor: "none" }} >
                                    <FaXbox />
                                    Xbox
                                </HStack>
                            </NavLink>
                        </List.Item>
                        <List.Item>
                            <NavLink to="/products/pc" style={isActiveNavLink} >
                                <HStack onClick={() => setOpen(false)} _hover={{ color: "teal.300", textDecor: "none" }} >
                                    <FaLaptopCode /> PC
                                </HStack>
                            </NavLink>
                        </List.Item>
                    </List.Root>
                </DrawerBody>
                {/* <DrawerFooter>
                    <DrawerActionTrigger asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerActionTrigger>
                    <Button>Save</Button>
                </DrawerFooter> */}
                <DrawerCloseTrigger />
            </DrawerContent>
        </DrawerRoot>
    )
}

export default HeaderBurger
