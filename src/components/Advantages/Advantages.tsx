import {
    SimpleGrid,
    Card,
    Heading,
    VStack,
    Flex,
    GridItem
} from "@chakra-ui/react";
import {
    FaGamepad,
    FaTrophy,
    FaUsers,
    FaGlobe,
    FaClock,
    FaGift,
    FaHeadset,
    FaDownload,
    FaShieldAlt
} from "react-icons/fa";

const Advantages = () => {
    return (
        <VStack as="section" gap={7} mt={{ base: 20, md: 40 }}>
            <Heading
                as="h2"
                size="4xl"
                bgClip="text"
                bgGradient="to-r"
                gradientFrom="teal.500"
                gradientTo="cyan.400" >
                Почему стоит покупать игры у нас?
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6" maxW="4xl">
                {advantages.map((advantage, index) => (
                    <GridItem key={index}>
                        <Card.Root h="full">
                            <Card.Header>
                                <Flex w="100%" justifyContent="center">
                                    {advantage.icon}
                                </Flex>
                            </Card.Header>
                            <Card.Body display="flex" flexDirection="column" justifyContent="space-between">
                                <Card.Title>{advantage.title}</Card.Title>
                                <Card.Description color="GrayText">
                                    {advantage.description}
                                </Card.Description>
                            </Card.Body>
                        </Card.Root>
                    </GridItem>
                ))}
            </SimpleGrid>
        </VStack>
    );
};

const advantages = [
    {
        icon: <FaGamepad size="100px" />,
        title: "1. Огромный выбор игр",
        description:
            "От классики до новинок — у нас найдутся игры на любой вкус и платформу."
    },
    {
        icon: <FaTrophy size="100px" />,
        title: "2. Лучшие цены и скидки",
        description:
            "Мы регулярно обновляем акции и даем возможность купить игры по выгодным ценам."
    },
    {
        icon: <FaUsers size="100px" />,
        title: "3. Онлайн и локальный мультиплеер",
        description:
            "Игры с поддержкой мультиплеера для игры с друзьями или со всем миром."
    },
    {
        icon: <FaGlobe size="100px" />,
        title: "4. Игры на разных языках",
        description:
            "Мы предлагаем игры с локализацией, включая русский, английский и другие языки."
    },
    {
        icon: <FaClock size="100px" />,
        title: "5. Быстрый доступ к играм",
        description:
            "Цифровые копии можно загрузить сразу после покупки без ожидания."
    },
    {
        icon: <FaHeadset size="100px" />,
        title: "6. Круглосуточная поддержка",
        description:
            "Наша служба поддержки поможет вам в любое время дня и ночи."
    },
    {
        icon: <FaDownload size="100px" />,
        title: "7. Легкая установка",
        description:
            "Все игры легко устанавливаются и обновляются через удобные платформы."
    },
    {
        icon: <FaShieldAlt size="100px" />,
        title: "8. Гарантия качества",
        description:
            "Мы продаем только лицензированные игры, защищенные от мошенничества."
    },
    {
        icon: <FaGift size="100px" />,
        title: "9. Подарочные коды",
        description:
            "Вы можете приобрести игры в подарок для друзей и близких."
    }
];

export default Advantages;
