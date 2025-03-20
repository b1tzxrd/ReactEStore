import { Box, Container, Heading, VStack, Avatar, Text, Button, Card, CardBody, CardTitle, CardDescription, List, Badge, CloseButton, Dialog, Portal, Image, HStack, ProgressCircle } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { db } from "../../../../firebase";
import { collection, getDocs, Timestamp } from "firebase/firestore";
import { LuCircleAlert, LuCircleCheck, LuCircleDashed } from "react-icons/lu";
import { useEffect } from "react";

interface IOrder {
    id: string;
    items: [],
    createdAt: Timestamp,
    paidAt: Timestamp,
    total: number,
    status: string;
}

interface IOrderItem {
    id: string,
    image: string,
    name: string,
    price: number
}

const fetchOrders = async (userId: string): Promise<IOrder[]> => {
    const ordersRef = collection(db, `orders/${userId}/userOrders`);
    const ordersSnap = await getDocs(ordersRef);
    return ordersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as IOrder));
};

const Profile = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const { data: orders, isLoading, error } = useQuery({
        queryKey: ["orders", user?.uid],
        queryFn: () => fetchOrders(user!.uid),
        enabled: !!user?.uid,
    });

    useEffect(() => {
        if (!loading && (user === null || error)) {
            const timeout = setTimeout(() => { navigate("/") }, 3000)
            return () => clearTimeout(timeout)
        }
    }, [user, loading, navigate, error])

    if (!loading && !user) {
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

    if (loading || isLoading) {
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

    if (error) {
        return (
            <Box bgColor="Background">
                <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10}>
                    <Heading as="h2" size="5xl" textAlign="center" bgClip="text" bgGradient="to-l" gradientFrom="red.500" gradientTo="orange.400">
                        Ошибка загрузки
                    </Heading>
                </Container>
            </Box>
        );
    }

    return (
        <Box bgColor="Background">
            <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10}>
                <Heading as="h2" size="5xl" textAlign="center" bgClip="text" bgGradient="to-l" gradientFrom="teal.500" gradientTo="cyan.400">
                    Мой профиль
                </Heading>
                <VStack gap={5} mt={10} alignItems="center">
                    <Card.Root w="310px" p={5} alignItems="center">
                        {user && <Avatar.Root colorPalette={!user.photoURL ? "teal" : "transparent"} variant="solid" size="sm" >
                            <Avatar.Fallback name={user?.displayName || "Без имени"} />
                            {user.photoURL && <Avatar.Image src={user?.photoURL} objectFit={"contain"} />}
                        </Avatar.Root>}
                        <CardBody textAlign="center">
                            <CardTitle>{user?.displayName || "Без имени"}</CardTitle>
                            <CardDescription>{user?.email}</CardDescription>
                            <Button mt={3} colorScheme="teal" onClick={() => navigate("/profile/edit")}>Изменить данные</Button>
                        </CardBody>
                    </Card.Root>
                    <Heading as="h3" size="xl" textAlign="center">Мои заказы</Heading>
                    {isLoading ? (
                        <Text>Загрузка заказов...</Text>
                    ) : (
                        <List.Root w="full" gap="2" variant="plain" align="center">
                            {orders?.map((order) => (
                                <List.Item key={order.id} >
                                    <List.Indicator color={order.status === "success" ? "green" : order.status === "pending" ? "orange" : "red"}>
                                        {order.status === "success" ? <LuCircleCheck /> : order.status === "pending" ? <LuCircleDashed /> : <LuCircleAlert />}

                                    </List.Indicator>
                                    <Card.Root w="full" p={3} onClick={() => {
                                        if (order.status === "pending") {
                                            navigate(`/checkout/${order.id}`)
                                        } else {
                                            return
                                        }


                                    }} cursor="pointer">
                                        <CardBody flexDir="row" flexWrap="wrap" justifyContent="space-between" alignItems={"center"} >
                                            <VStack alignItems="flex-start" mb={2} >
                                                <CardTitle>Заказ #{order.id}</CardTitle>
                                                <Box display="flex" alignItems="center" gap={2}>
                                                    <Badge colorPalette={order.status === "success" ? "green" : order.status === "pending" ? "orange" : "red"}>
                                                        {order.status === "success" ? "оплачено" : order.status === "pending" ? "ожидает оплаты" : "ошибка покупки"}
                                                    </Badge>
                                                </Box>
                                                <Text>Количество: {order.items.length}</Text>
                                                <Text>Итоговая стоимость: {order.total.toLocaleString()} ₸ </Text>
                                                <Text >
                                                    Оплачено: {new Date(order.paidAt?.seconds * 1000).toLocaleString("ru-RU")}
                                                </Text>
                                            </VStack>
                                            <Dialog.Root scrollBehavior="inside" >
                                                <Dialog.Trigger asChild onClick={(event) => event.stopPropagation()} >
                                                    <Button>
                                                        Посмотреть заказ
                                                    </Button>
                                                </Dialog.Trigger>
                                                <Portal>
                                                    <Dialog.Backdrop />
                                                    <Dialog.Positioner>
                                                        <Dialog.Content pos="relative" mx={2} >
                                                            <Dialog.Header>
                                                                <Dialog.Title>Заказ #{order.id}</Dialog.Title>
                                                            </Dialog.Header>

                                                            <Dialog.Body>
                                                                <VStack align="start" gap={3}>
                                                                    <Text fontWeight="bold">Дата оформления заказа: {new Date(order.createdAt?.seconds * 1000).toLocaleString("ru-RU")}</Text>
                                                                    <Text fontWeight="bold">Дата покупки: {new Date(order.paidAt?.seconds * 1000).toLocaleString("ru-RU")}</Text>
                                                                    <Badge colorPalette={order.status === "success" ? "green" : order.status === "pending" ? "orange" : "red"}>
                                                                        {order.status === "success" ? "Оплачено" : order.status === "pending" ? "Ожидает оплаты" : "Ошибка покупки"}
                                                                    </Badge>
                                                                    <Text fontWeight="bold">Игры:</Text>
                                                                    <VStack align="start" gap={2}>
                                                                        {order.items.map((game: IOrderItem) => (
                                                                            <Box key={game.id} display="flex" alignItems="center" gap={3}>
                                                                                <Image src={game.image} w="100px" />
                                                                                <Text>{game.name} - {game.price.toLocaleString()} ₸</Text>
                                                                            </Box>
                                                                        ))}
                                                                    </VStack>
                                                                </VStack>
                                                            </Dialog.Body>

                                                            <Dialog.Footer justifyContent={"space-between"} >
                                                                <Text fontWeight="bold">Итого: {order.total.toLocaleString()} ₸</Text>
                                                                <HStack>
                                                                    {
                                                                        order.status === "pending" && (
                                                                            <Dialog.CloseTrigger asChild>
                                                                                <Button colorPalette="green" onClick={() => navigate(`/checkout/${order.id}`)} >Оплатить</Button>
                                                                            </Dialog.CloseTrigger>
                                                                        )
                                                                    }
                                                                    <Dialog.CloseTrigger asChild>
                                                                        <Button variant="outline">Закрыть</Button>
                                                                    </Dialog.CloseTrigger>
                                                                </HStack>
                                                            </Dialog.Footer>
                                                            <Dialog.CloseTrigger asChild pos="absolute" top={0} right={0} >
                                                                <CloseButton size="sm" />
                                                            </Dialog.CloseTrigger>
                                                        </Dialog.Content>

                                                    </Dialog.Positioner>
                                                </Portal>
                                            </Dialog.Root>
                                        </CardBody>
                                    </Card.Root>
                                </List.Item>
                            ))}
                        </List.Root>
                    )}
                </VStack>
            </Container>
        </Box >
    );
};

export default Profile;
