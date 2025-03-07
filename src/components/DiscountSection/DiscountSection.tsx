import { Box, Image, Text, Button, VStack, Heading, Stack, Badge } from "@chakra-ui/react";
import gameDiscountImg from "../../assets/game_discount.webp"; // Изображение скидок на игры

const DiscountsSection = () => {
    return (
        <Box
            w="full"
            mt={{ base: 20, md: 40 }}
            borderRadius="lg"
            overflow="hidden"
        >
            <Stack
                direction={{ base: "column", md: "row" }} // Для мобильных - текст сверху, картинка снизу
                gapY={{base: 10, md: 0}}
                gapX={{base: 0, md: 10}}
                align="center"
            >
                {/* Текстовый блок */}
                <VStack textAlign="center">
                    <Heading
                        as="h2"
                        size="4xl"
                        bgClip="text"
                        bgGradient="to-r"
                        gradientFrom="teal.500"
                        gradientTo="cyan.400"
                    >
                        Грандиозные скидки на видеоигры!
                    </Heading>
                    <Text fontSize={{ base: "md", md: "lg" }} maxW="600px">
                        Лови лучшие предложения на самые популярные игры для PlayStation, Xbox и PC!
                        Ограниченное время — успей купить любимые тайтлы по суперценам!
                    </Text>
                    <Button disabled colorPalette="teal" variant="subtle">
                        Перейти к скидкам
                    </Button>
                </VStack>

                {/* Блок с картинкой */}
                <Box
                    w={{ base: "full", md: "50%" }}
                    h={{ base: "200px", md: "400px" }}
                    overflow="hidden"
                    borderRadius="15px"
                    pos="relative"
                >
                    <Image
                        src={gameDiscountImg}
                        alt="Game Discounts Banner"
                        objectFit="cover"
                        w="full"
                        h="full"
                    />
                    <Badge pos="absolute" bottom={1} right={3} colorPalette="teal">
                        сгенерировано ии
                    </Badge>
                </Box>
            </Stack>
        </Box>
    );
};

export default DiscountsSection;
