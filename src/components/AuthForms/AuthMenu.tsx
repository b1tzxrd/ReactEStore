import { MenuRoot, MenuTrigger, IconButton, MenuContent, MenuItem } from "@chakra-ui/react";
import { FaCircleUser } from "react-icons/fa6";
import AuthForm from "./AuthForm";
import RegForm from "./RegForm";


const AuthMenu = () => {
    return (
        <MenuRoot >
            <MenuTrigger asChild>
                <IconButton
                    position="relative"
                    variant="ghost"
                    size="xs"
                    display={{ base: "block", md: "none" }}
                    p={2}
                >
                    <FaCircleUser />
                </IconButton>
            </MenuTrigger>
            <MenuContent
                pos="absolute"
                display={{ base: "block", md: "none" }}
                top={10}
                right={10} >
                <MenuItem value="auth" closeOnSelect={false}>
                    <AuthForm />
                </MenuItem>
                <MenuItem value="reg" closeOnSelect={false}>
                    <RegForm />
                </MenuItem>
            </MenuContent>
        </MenuRoot>
    );
}

export default AuthMenu;