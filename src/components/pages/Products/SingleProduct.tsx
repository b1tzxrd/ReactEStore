import { useParams } from 'react-router-dom';
import {
    Avatar,
    Badge,
    Box,
    Button,
    Container,
    Flex,
    Heading,
    HStack,
    IconButton,
    Image,
    List,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { FaXbox, FaPlaystation, FaLaptopCode } from "react-icons/fa";
import { MdFavoriteBorder, MdRateReview } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";
import { useColorMode } from "@/components/ui/color-mode";
import Sliderrr from "../Sliderrr/Sliderrr";
import { Rating } from "@/components/ui/rating";
import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/api/products';
import { cartService } from '@/services/cartService';
// import SimilarProducts from "@/components/SimilarProducts/SimilarProducts";
import { v4 as uuidv4 } from 'uuid';
import { Toaster } from '@/components/ui/toaster';
import SingleProductSkeleton from '@/components/Skeletons/SingleProductSkeleton';




interface IReview {
    id: string,
    gameId: string
    avatar: string,
    author: string,
    rating: number,
    text: string | null
}
// const product: IProduct = {
//     id: "1",
//     name: "Grand Theft Auto V PS5",
//     platform: <FaPlaystation />,
//     colorPalette: "blue",
//     genre: "Action",
//     language: "Английский с русскими субтитрами",
//     publisher: "RockStarGames",
//     ageLimit: "18+",
//     version: "Стандартное издание",
//     description:
//         `Лос-Сантос – город солнца, старлеток и вышедших в тираж звезд. Некогда предмет зависти всего западного мира, ныне это пристанище дрянных реалити-шоу, задыхающееся в тисках экономических проблем. В центре всей заварухи – троица совершенно разных преступников, отчаянно пытающихся ухватить удачу за хвост в непрекращающейся борьбе за место под солнцем. Бывший член уличной банды Франклин старается завязать с прошлым. Отошедший от дел грабитель банков Майкл обнаруживает, что в честной жизни все не так радужно, как представлялось. Повернутый на насилии псих Тревор перебивается от одного дельца к другому в надежде сорвать крупный куш. Исчерпав варианты, эти трое ставят на кон собственные жизни и учиняют серию дерзких ограблений, в которых – или пан, или пропал. В Grand Theft Auto V поклонников ждет не просто самый огромный и детализированный мир из когда-либо создававшихся Rockstar Games, но и возможность влиять на жизнь и поступки сразу трех главных героев. Такое переплетение историй нескольких персонажей позволит сделать игру максимально увлекательной и захватывающей. Все атрибуты знаменитой серии в полной мере присущи и Grand Theft Auto V – здесь и невероятное внимание к деталям, и фирменный черный юмор, и высмеивание поп-культуры, и даже совершенно новый, невероятно амбициозный мультиплеерный режим.`,
//     price: 37990,
//     image: "/assets/gta5ps5.webp",
//     gallery: [
//         "/assets/gta-pics-one.jpg",
//         "/assets/gta-pics-two.jpg",
//         "/assets/gta-pics-three.jpg",
//         "/assets/gta-pics-four.jpg"
//     ]
// };
const reviews: IReview[] = [
    {
        id: "1",
        gameId: "1",
        avatar: "https://bit.ly/dan-abramov",
        author: "Егор",
        rating: 5,
        text: "Игра просто огонь! Огромный открытый мир, множество возможностей, интересный сюжет и отличная графика. Можно часами просто кататься по Лос-Сантосу, наслаждаясь атмосферой. Онлайн-режим тоже радует, хотя иногда попадаются баги. В целом – шедевр!"
    },
    {
        id: "2",
        gameId: "1",
        avatar: "https://bit.ly/kent-c-dodds",
        author: "Анна",
        rating: 4,
        text: "Очень понравилась история персонажей, особенно Майкла и Тревора. Разнообразные миссии, интересные механики и отличный саундтрек. Единственный минус – цена внутриигровых покупок в GTA Online, но если играть без доната, тоже можно получить удовольствие."
    },
    {
        id: "3",
        gameId: "1",
        avatar: "https://bit.ly/ryan-florence",
        author: "Владимир",
        rating: 4,
        text: "Крутая игра с детализированным миром, но хотелось бы побольше контента в одиночной кампании. После прохождения основного сюжета делать особо нечего, кроме исследования города. Онлайн – неплох, но встречаются читеры. В остальном всё топ!"
    },
    {
        id: "4",
        gameId: "1",
        avatar: "https://bit.ly/prosper-baba",
        author: "Максим",
        rating: 5,
        text: "Лучшая игра в своем жанре! Прошел сюжет несколько раз, но всё равно возвращаюсь. Rockstar умеют делать качественные проекты. Надеюсь, что GTA 6 будет еще круче!"
    },
    {
        id: "5",
        gameId: "1",
        avatar: "https://bit.ly/code-beast",
        author: "Сергей",
        rating: 3,
        text: "Игра неплохая, но слишком много внимания к онлайн-режиму. Хотелось бы больше одиночного контента и DLC для сюжетки. В целом, заслуживает внимания, но могло быть лучше."
    },
    {
        id: "6",
        gameId: "1",
        avatar: "https://bit.ly/sage-adebayo",
        author: "Ирина",
        rating: 5,
        text: "Люблю GTA V за ее атмосферу. Город живет своей жизнью, персонажи интересные, а юмор просто шикарен! Много контента, который держит в игре на долгие часы."
    },
    {
        id: "7",
        gameId: "1",
        avatar: "https://bit.ly/ryan-florence",
        author: "Алексей",
        rating: 4,
        text: "Отличный проект, но разработчики могли бы поработать над оптимизацией. На старых консолях игра лагает. В остальном – классика жанра!"
    },
    {
        id: "8",
        gameId: "1",
        avatar: "https://bit.ly/dan-abramov",
        author: "Ольга",
        rating: 5,
        text: "GTA V – это легенда. Сюжет, геймплей, графика – всё на высоте! С друзьями играем в онлайн-режим уже несколько лет, и до сих пор интересно."
    },
    {
        id: "9",
        gameId: "1",
        avatar: "https://bit.ly/kent-c-dodds",
        author: "Дмитрий",
        rating: 4,
        text: "Жаль, что в онлайне так много доната и читеров. Если бы разработчики активнее боролись с ними, было бы еще лучше. А так – топовая игра, конечно!"
    },
    {
        id: "10",
        gameId: "1",
        avatar: "https://bit.ly/prosper-baba",
        author: "Татьяна",
        rating: 5,
        text: "Я в восторге! Один из лучших открытых миров, которые я видела. Можно просто гулять по городу и получать удовольствие. Сюжет держит в напряжении до самого конца!"
    }
];



const SingleProduct: React.FC = () => {

    const { id } = useParams()
    const { mutate: addToCart } = cartService.useAddToCart()
    const { colorMode } = useColorMode()

    const productQuery = useQuery({
        queryKey: ['products', id],
        queryFn: () => id ? getProduct(id) : Promise.reject(new Error("ID не найден")),
        enabled: !!id
    })

    if (productQuery.status === "error") {
        return <Heading
            as="h2"
            size="4xl"
            bgClip="text"
            bgGradient="to-r"
            gradientFrom="teal.500"
            gradientTo="cyan.400" >{productQuery.error.message}</Heading>
    }


    const platformBadge = productQuery.data?.platform === "ps" ? <FaPlaystation /> : productQuery.data?.platform == "xbox" ? <FaXbox /> : <FaLaptopCode />

    return (
        <Box bgColor="Background">
            <Toaster />
            <Container py={10} minH="100vh">
                {
                    productQuery.status === "pending" ? (
                        <SingleProductSkeleton/>
                    ) : (
                        <VStack gap={10}>
                            <Heading
                                as="h2"
                                size="4xl"
                                bgClip="text"
                                bgGradient="to-r"
                                gradientFrom="teal.500"
                                gradientTo="cyan.400" >
                                {productQuery.data?.name}
                            </Heading>
                            <Stack flexWrap="wrap" flexDir="row" justifyContent="center" gap={{ base: 5, md: 10 }}  >
                                <Image
                                    objectFit="cover"
                                    maxW={{ base: "300px", md: "300px" }}
                                    src={productQuery.data?.image}
                                    alt="Caffe Latte"
                                    rounded={15}
                                    order={{ base: 1, md: 1 }}
                                />
                                <Flex flexDirection="column" justifyContent="space-around" order={{ base: 3, sm: 2 }} >
                                    <Heading >{productQuery.data?.name}</Heading>
                                    <HStack>
                                        <Badge size="lg" colorPalette={productQuery.data?.colorPalette} >{platformBadge}</Badge>
                                        <Badge size="lg" colorPalette="teal">{productQuery.data?.genre}</Badge>
                                    </HStack>
                                    <Heading fontWeight="bold">Характеристики</Heading>
                                    <List.Root color="GrayText" listStyle="none">
                                        <List.Item>Артикул: {productQuery.data?.id}</List.Item>
                                        <List.Item>Возрастное ограничение {productQuery.data?.ageLimit}</List.Item>
                                        <List.Item>Язык: {productQuery.data?.language}</List.Item>
                                        <List.Item>Бренд: {productQuery.data?.publisher}</List.Item>
                                        <List.Item>Жанр: {productQuery.data?.genre}</List.Item>
                                        <List.Item>Версия издания: {productQuery.data?.version}</List.Item>
                                    </List.Root>
                                </Flex>
                                <Flex w="300px" h="150px" bgColor={colorMode === "dark" ? "gray.800" : "gray.100"} order={{ base: 2, sm: 3 }} rounded={5} flexDir="column" justifyContent="space-between" alignItems="center" p={5} >
                                    <HStack>
                                        <Text color={colorMode === "dark" ? "gray.200" : "gray.500"} fontSize="xl" >Цена: </Text>
                                        <Heading
                                            fontSize="3xl"
                                            bgClip="text"
                                            bgGradient="to-r"
                                            gradientFrom="teal.500"
                                            gradientTo="cyan.400" >
                                            {productQuery.data?.price} ₸
                                        </Heading>
                                    </HStack>
                                    <Flex justifyContent="space-between" w="100%" flexDir="row" >
                                        <Button
                                            colorPalette="teal"
                                            variant="solid"
                                            onClick={() => addToCart({
                                                id: uuidv4(),
                                                gameId: productQuery.data?.id,
                                                name: productQuery.data?.name,
                                                platform: productQuery.data?.platform,
                                                colorPalette: productQuery.data?.colorPalette,
                                                genre: productQuery.data?.genre,
                                                price: productQuery.data?.price,
                                                image: productQuery.data?.image
                                            })}
                                        >
                                            <FiShoppingCart />
                                            <Text >Добавить в корзину</Text>
                                        </Button>
                                        <IconButton colorPalette="teal" variant="surface" aria-label="Add to favorites" >
                                            <MdFavoriteBorder />
                                        </IconButton>
                                    </Flex>
                                </Flex>
                            </Stack>
                            <VStack mt={100}>
                                <Sliderrr gallery={productQuery.data?.gallery ?? []} />
                                <Heading
                                    mt={10}
                                    as="h2"
                                    size="4xl"
                                    bgClip="text"
                                    bgGradient="to-r"
                                    gradientFrom="teal.500"
                                    gradientTo="cyan.400" >
                                    Описание
                                </Heading>
                                <Text
                                    maxW="1000px"
                                    color="GrayText"
                                    textAlign="justify"
                                    lineHeight="1.8"
                                >
                                    {productQuery.data?.description}
                                </Text>
                            </VStack>
                            <VStack>
                                <Heading
                                    as="h2"
                                    size="4xl"
                                    bgClip="text"
                                    bgGradient="to-r"
                                    gradientFrom="teal.500"
                                    gradientTo="cyan.400" >
                                    Отзывы
                                </Heading>
                                <Flex gap={5} flexDir="row" flexWrap="wrap" justifyContent="center" >

                                    {!reviews.length || !reviews ? (
                                        <EmptyState
                                            icon={<MdRateReview color="teal" />}
                                            title="Отзывов пока нет"
                                            description={`Купите ${productQuery.data?.name} и мы будем рады, если вы оставите отзыв`}
                                        />
                                    ) : (reviews.map(({ id, avatar, author, rating, text }) => (
                                        <Stack key={id} maxW="320px" gap="4" bgColor="bg.muted" p={5} rounded={5}>
                                            <HStack gap="4">
                                                <Avatar.Root shape="rounded" size="lg">
                                                    <Avatar.Image src={avatar} />
                                                </Avatar.Root>
                                                <Text fontWeight="medium">{author}</Text>
                                            </HStack>
                                            <Rating colorPalette="teal" readOnly size="xs" defaultValue={rating} />
                                            <Text color="GrayText" >{text}</Text>
                                        </Stack>
                                    )))}
                                </Flex>
                            </VStack>
                            {/* <VStack>
                        <Heading
                            as="h2"
                            size="4xl"
                            bgClip="text"
                            bgGradient="to-r"
                            gradientFrom="teal.500"
                            gradientTo="cyan.400" >
                            Похожие товары
                        </Heading>
                        <SimilarProducts/>
                    </VStack> */}
                        </VStack>
                    )
                }
            </Container>
        </Box>
    );
};

export default SingleProduct;

