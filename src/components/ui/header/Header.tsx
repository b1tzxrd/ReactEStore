import { Box, Flex, Heading, Button, Container } from "@chakra-ui/react";

const Header: React.FC = () => {
    return (
        <>
            <Box as="header" p={4} color="white" maxH="90">
                <Container fluid>
                    <Flex align="center" justify="space-between">
                        {/* Логотип или название */}
                        <Heading as="h1" size="xl" color="teal.400">ReactEstore</Heading>

                        {/* <Spacer /> Для выравнивания по бокам */}

                        {/* Кнопки или ссылки */}
                        <Box>
                            <Button colorPalette="teal" variant="outline" size="sm" mr={4}>
                                Войти
                            </Button>
                            <Button colorPalette="teal" size="sm">
                                Зарегестрироваться
                            </Button>
                        </Box>
                    </Flex>
                </Container>
            </Box>
            <hr />
        </>
    );
};

export default Header;