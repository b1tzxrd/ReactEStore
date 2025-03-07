import React from "react";
import { VStack, HStack, Skeleton, Stack, Flex } from "@chakra-ui/react";

const gradientColor = {
    "--start-color": "colors.teal.500",
    "--end-color": "colors.cyan.500",
}


const SingleProductSkeleton: React.FC = () => {
    return (
        <VStack gap={10} align="center">
            {/* Заголовок товара */}
            <Skeleton height="50px" width="60%" css={gradientColor} variant="shine"  />

            {/* Основная секция (картинка + характеристики + цена/кнопки) */}
            <Stack flexWrap="wrap" flexDir="row" justifyContent="center" gap={{ base: 5, md: 10 }}>
                {/* Картинка */}
                <Skeleton boxSize="300px" css={gradientColor} variant="shine" />

                {/* Характеристики */}
                <VStack align="start" gap={3} flex="1">
                    <Skeleton height="40px" width="80%" css={gradientColor} variant="shine" />
                    <HStack>
                        <Skeleton height="24px" width="60px" css={gradientColor} variant="shine" />
                        <Skeleton height="24px" width="60px" css={gradientColor} variant="shine" />
                    </HStack>
                    <Skeleton height="30px" width="150px" css={gradientColor} variant="shine" />
                    <VStack align="start" gap={2}>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={index} height="20px" width="100%" css={gradientColor} variant="shine" />
                        ))}
                    </VStack>
                </VStack>

                {/* Цена и кнопки */}
                <VStack w="300px" h="150px" justifyContent="space-between" p={5}>
                    <Skeleton height="30px" width="80%" css={gradientColor} variant="shine" />
                    <HStack justify="space-between" w="100%">
                        <Skeleton height="40px" width="120px" css={gradientColor} variant="shine" />
                        <Skeleton height="40px" width="40px" css={gradientColor} variant="shine" />
                    </HStack>
                </VStack>
            </Stack>

            {/* Галерея / слайдер */}
            <Skeleton height="300px" width="100%" css={gradientColor} variant="shine" />

            {/* Описание */}
            <VStack gap={3}>
                <Skeleton height="40px" width="200px" css={gradientColor} variant="shine" />
                <Skeleton height="100px" width="1000px" css={gradientColor} variant="shine" />
            </VStack>

            {/* Отзывы */}
            <VStack>
                <Skeleton height="40px" width="200px" css={gradientColor} variant="shine" />
                <Flex gap={5} flexWrap="wrap" justifyContent="center">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Stack key={index} maxW="320px" gap="4" bgColor="bg.muted" p={5} rounded={5}>
                            <HStack gap="4">
                                <Skeleton borderRadius="full" width="40px" css={gradientColor} variant="shine" />
                                <Skeleton height="20px" width="120px" css={gradientColor} variant="shine" />
                            </HStack>
                            <Skeleton height="20px" width="60%" css={gradientColor} variant="shine" />
                            <Skeleton height="60px" width="100%" css={gradientColor} variant="shine" />
                        </Stack>
                    ))}
                </Flex>
            </VStack>
        </VStack>
    );
};

export default SingleProductSkeleton;
