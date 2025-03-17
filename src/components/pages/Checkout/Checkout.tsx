import useAuth from "@/hooks/useAuth"
import { Box, Container, Heading, HStack, ProgressCircle, Text, VStack, Image, List, Card, Input, Button, Field, Fieldset } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"
import { useNavigate, useParams } from "react-router-dom"
import { SubmitHandler, useForm } from "react-hook-form"
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore"
import { db } from "../../../../firebase"
import { cartService } from "@/services/cartService"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

interface ICheckoutItem {
    id: string,
    platform: "ps" | "pc" | "xbox",
    colorPalette: "blue" | "teal" | "green",
    genre: string,
    gameId: string,
    name: string,
    price: number,
    image: string
}

interface ICardValuesInput {
    cardNumber: string,
    cardName: string,
    expiryDate: string,
    cvv: string
}

const fetchOrder = async (userId: string, orderId: string) => {
    const orderRef = doc(db, `orders/${userId}/userOrders/${orderId}`);
    const orderSnap = await getDoc(orderRef);
    if (!orderSnap.exists()) throw new Error("Заказ не найден");
    return orderSnap.data();
}

const Checkout = () => {
    const { user, loading } = useAuth()
    const { orderId } = useParams()
    const navigate = useNavigate()
    const { mutate: removeFromCart } = cartService.useRemoveFromCart();
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<ICardValuesInput>({
        mode: "all",
        defaultValues: {
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cvv: ""
        }
    })

    const { data: order, isLoading, error } = useQuery({
        queryKey: ["order", user?.uid, orderId],
        queryFn: () => fetchOrder(user!.uid, orderId!),
        enabled: !!user?.uid && !!orderId
    });


    useEffect(() => {
            if (!loading && (user === null || order?.status === "success" || error)) {
                const timeout = setTimeout(() => { navigate("/") }, 3000)
                return () => clearTimeout(timeout)
            }
        }, [user, loading, navigate, order?.status, error])



    if (order && order.status === "success" ) {
        return (
            <Box bgColor="Background">
                <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10}>
                    <Heading as="h2" size="5xl" textAlign="center" bgClip="text" bgGradient="to-l" gradientFrom="red.500" gradientTo="orange.400">
                        Эта страница не актуальна
                    </Heading>
                </Container>
            </Box>
        );
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
                        Ошибка загрузки заказа
                    </Heading>
                </Container>
            </Box>
        );
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

    const validateCardNumber = (value: string) => {
        const cleaned = value.replace(/\s+/g, "");
        return /^\d{16}$/.test(cleaned) || "Номер карты должен содержать 16 цифр";
    };

    const validateCardName = (value: string) => {
        return /^[A-Za-zА-Яа-яЁё\s]+$/.test(value) || "Имя должно содержать только буквы";
    };

    const validateExpiryDate = (value: string) => {
        if (!/^\d{2}\/\d{2}$/.test(value)) return "Формат MM/YY";
        const [month, year] = value.split("/").map(Number);
        if (month < 1 || month > 12) return "Неверный месяц";
        const currentYear = new Date().getFullYear() % 100;
        return year >= currentYear ? true : "Карта просрочена";
    };

    const validateCVV = (value: string) => {
        return /^\d{3,4}$/.test(value) || "CVV должен содержать 3-4 цифры";
    };

    const onSubmit: SubmitHandler<ICardValuesInput> = async (data) => {

        try {
            const orderRef = doc(db, `orders/${user.uid}/userOrders/${orderId}`)

            await updateDoc(orderRef, {
                status: "success",
                paymentInfo: {
                    cardLast4: data.cardNumber.slice(-4),
                    cardHolder: data.cardName,
                },
                paidAt: serverTimestamp()
            })

            await Promise.all(order?.items.map((item: ICheckoutItem) => removeFromCart(item.gameId)));

            toaster.success({
                title: "Заказ оформлен",
                description: "Спасибо за покупку, ваш заказ был успешно оформлен."
            })

            setTimeout(() => {
                navigate("/profile")
            }, 3000)
        } catch (error) {
            console.error("Checkout error - " + error)
            toaster.error({
                title: "Ошибка оформления заказа"
            })
        }
    };



    return (
        <Box bgColor="Background" >
            <Toaster />
            <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10} >
                <Heading
                    as="h2"
                    size="5xl"
                    textAlign="center"
                    bgClip="text"
                    bgGradient="to-l"
                    gradientFrom="teal.500"
                    gradientTo="cyan.400" >
                    Оформление заказа
                </Heading>
                <HStack flexWrap={"wrap"} justifyContent="space-between" alignItems="flex-start" pt={5} >
                    <List.Root order={{base: 2, md: 1}} listStyle="none"  overflowY={{sm: "none", md: "scroll"}} maxH={{sm: undefined, md: "660px"}} gapY={3} alignItems={"flex-start"} >
                        {order && order.items.map((item: ICheckoutItem) => (
                            <List.Item key={item.id} gapX={3} w="full" >
                                <Card.Root  flexDirection="row" overflow="hidden"  p={2} >
                                    <Image w="150px" rounded="2xl" src={item.image} alt={item.name} />
                                    <Card.Body alignItems="flex-start" justifyContent="center" >
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Description fontSize="2xl" >{item.price.toLocaleString()} тг</Card.Description>
                                    </Card.Body>
                                </Card.Root>
                            </List.Item>
                        ))}
                    </List.Root>
                    <Fieldset.Root order={{base: 1, md: 2}} gap={4} p={5} borderWidth={1} borderRadius="lg" w="400px">
                        <VStack as="form" onSubmit={handleSubmit(onSubmit)} >
                            <Fieldset.Legend fontSize="lg">Карточные данные</Fieldset.Legend>
                            <Field.Root invalid={!!errors.cardNumber}>
                                <Field.Label>Номер карты</Field.Label>
                                <Input
                                    placeholder="0000 0000 0000 0000"
                                    {...register("cardNumber", { required: "Введите номер карты", validate: validateCardNumber })}
                                />
                                {errors.cardNumber && <Field.ErrorText>{errors.cardNumber.message}</Field.ErrorText>}
                            </Field.Root>

                            <Field.Root invalid={!!errors.cardName}>
                                <Field.Label>Имя на карте</Field.Label>
                                <Input
                                    placeholder="Имя Фамилия"
                                    {...register("cardName", { required: "Введите имя", validate: validateCardName })}
                                />
                                {errors.cardName && <Field.ErrorText>{errors.cardName.message}</Field.ErrorText>}
                            </Field.Root>

                            <Field.Root invalid={!!errors.expiryDate}>
                                <Field.Label>Срок действия</Field.Label>
                                <Input
                                    placeholder="MM/YY"
                                    {...register("expiryDate", { required: "Введите срок действия", validate: validateExpiryDate })}
                                />
                                {errors.expiryDate && <Field.ErrorText>{errors.expiryDate.message}</Field.ErrorText>}
                            </Field.Root>

                            <Field.Root invalid={!!errors.cvv}>
                                <Field.Label>CVV</Field.Label>
                                <Input
                                    placeholder="000"
                                    type="password"
                                    {...register("cvv", { required: "Введите CVV", validate: validateCVV })}
                                />
                                {errors.cvv && <Field.ErrorText>{errors.cvv.message}</Field.ErrorText>}
                            </Field.Root>
                            <Button disabled={!isValid} type="submit" colorScheme="teal" w="full">Оплатить {order?.total.toLocaleString()} ₸</Button>
                        </VStack>
                    </Fieldset.Root>
                </HStack>
            </Container>
        </Box>
    )
}

export default Checkout
