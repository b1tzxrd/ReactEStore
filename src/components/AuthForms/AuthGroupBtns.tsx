import { HStack } from "@chakra-ui/react";
import AuthForm from "./AuthForm";
import RegForm from "./RegForm";


const AuthGroupBtns = () => {
    return (
        <HStack align="center" display={{ base: "none", md: "flex" }}>
            <AuthForm />
            <RegForm />
        </HStack>
    )
}

export default AuthGroupBtns;