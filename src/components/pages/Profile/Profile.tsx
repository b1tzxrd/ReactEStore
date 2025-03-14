import useAuth from "@/hooks/useAuth"
import { Box, Container, Heading, HStack, ProgressCircle, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"


const Profile = () => {


    const { user, loading } = useAuth()
    const navigate = useNavigate()
    console.log(user)

    useEffect(() => {
        if (!loading && user === null) {
            const timeout = setTimeout(() => { navigate("/") }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [user, loading, navigate])

    if (loading) {
        return (
            <Box bgColor="Background" >
                <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10} display="flex" justifyContent="center" alignItems="center">
                    <HStack>
                        <Text
                            textAlign="center"
                            fontSize="5xl"
                            bgClip="text"
                            bgGradient="to-l"
                            gradientFrom="teal.500"
                            gradientTo="cyan.400">
                            Загрузка
                        </Text>
                        <ProgressCircle.Root value={null} size="lg" colorPalette="teal">
                            <ProgressCircle.Circle>
                                <ProgressCircle.Track />
                                <ProgressCircle.Range strokeLinecap="butt" />
                            </ProgressCircle.Circle>
                        </ProgressCircle.Root>
                    </HStack>
                </Container>
            </Box>
        )
    }

    if (!user) {
        return (
            <Box bgColor="Background" >
                <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10} >
                    <Heading
                        as="h2"
                        size="5xl"
                        textAlign="center"
                        bgClip="text"
                        bgGradient="to-l"
                        gradientFrom="teal.500"
                        gradientTo="cyan.400">
                        Вы не авторизованы
                    </Heading>
                </Container>
            </Box>
        )
    }

    return (
        <Box bgColor="Background" >
            <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10} >
                <Heading
                    as="h2"
                    size="5xl"
                    textAlign="center"
                    bgClip="text"
                    bgGradient="to-l"
                    gradientFrom="teal.500"
                    gradientTo="cyan.400" >
                    Мой профиль
                </Heading>
            </Container>
        </Box>
    )
}

export default Profile