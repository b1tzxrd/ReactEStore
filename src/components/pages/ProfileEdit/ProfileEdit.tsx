
import useAuth from "@/hooks/useAuth"
import { authService } from "@/services/authService"
import { toaster, Toaster } from "@/components/ui/toaster"
import { Box, Button, Container, Field, Fieldset, Heading, HStack, Input, Stack } from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { sendEmailVerification } from "firebase/auth"

export interface IFormInputs {
    displayName: string,
    email: string,
    password: string,
    photoURL: string
}

const ProfileEdit: React.FC = () => {

    const { user } = useAuth()
    console.log(user)
    const { mutate: updateUser } = authService.useUpdateUser()
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<IFormInputs>({
        mode: "all",
        defaultValues: {
            displayName: "",
            email: "",
            password: "",
            photoURL: "",
        }
    })

    useEffect(() => {
        if (user) {
            setValue("displayName", user.displayName || "")
            setValue("email", user.email || "")
            setValue("photoURL", user.photoURL || "")
        }
    }, [user, setValue])


    const onSubmit = (data: IFormInputs) => {
        console.log(data)
        updateUser(data)
    }

    return (
        <Box bgColor="Background" >
            <Toaster />
            <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10} bgColor="Background" >
                <Heading
                    as="h2"
                    mb={10}
                    size="5xl"
                    textAlign="center"
                    bgClip="text"
                    bgGradient="to-l"
                    gradientFrom="teal.500"
                    gradientTo="cyan.400">
                    Редактирование профиля
                </Heading>
                <Fieldset.Root size="lg" maxW="md" m="0 auto" >
                    <Stack>
                        <Fieldset.Legend > Контактная информация </Fieldset.Legend>
                        <Fieldset.HelperText> Пожалуйста, укажите ниже Ваши контактные данные для их изменения </Fieldset.HelperText>
                    </Stack>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Fieldset.Content >
                            <Field.Root invalid={!!errors.displayName} >
                                <Field.Label>Ваше Имя</Field.Label>
                                <Input
                                    _focus={errors.displayName ? { outlineColor: "border.error" } : { borderColor: "teal.500", outlineColor: "teal.500" }}
                                    type="text"
                                    {...register("displayName", {
                                        minLength: { value: 2, message: "Имя должно содержать минимум 2 символа" },
                                        maxLength: { value: 30, message: "Имя не может быть длиннее 30 символов" },
                                        pattern: { value: /^[A-Za-zА-Яа-яЁё]+$/, message: "Имя может содержать только буквы и пробелы" }
                                    })} />
                                {errors.displayName && <Field.ErrorText>{errors.displayName.message}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root invalid={!!errors.email}>
                                <Field.Label>Ваше Электронная Почта</Field.Label>
                                <HStack w={"100%"} >
                                    <Input
                                        disabled={!user?.emailVerified}
                                        _focus={errors.email ? { outlineColor: "border.error" } : { borderColor: "teal.500", outlineColor: "teal.500" }}
                                        type="email"
                                        {...register("email", {
                                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный email" }
                                        })}
                                        required />
                                    {!user?.emailVerified && (
                                        <Button onClick={async () => {
                                            if (user) {
                                                await sendEmailVerification(user).then(() => toaster.success({ title: "письмо отправлено" })).catch((e) => toaster.error({ title: "Ошибка отправки письма" + e.message }))
                                            }
                                        }} >Подтвердить</Button>
                                    )}
                                </HStack>
                                {!user?.emailVerified && <Field.HelperText>Вы можете изменить почту только после подтверждения.</Field.HelperText>}
                                {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                            </Field.Root>
                            {watch("email") === user?.email ? (
                                <>
                                    <Field.Root>
                                        <Field.Label>Подтвердите пароль</Field.Label>
                                        <HStack w="100%" >
                                            <Input placeholder="Введите ваш пароль для изменения почты" ></Input>
                                            <Button colorPalette="orange" >
                                                Подтвердить
                                            </Button>
                                        </HStack>
                                        <Field.HelperText color="orange" >Ведите текущий пароль для смены почты</Field.HelperText>
                                    </Field.Root>
                                </>
                            ) : null}
                            <Field.Root invalid={!!errors.password}>
                                <Field.Label> Ваш новый Пароль </Field.Label>
                                <Input
                                    _focus={errors.password ? { outlineColor: "border.error" } : { borderColor: "teal.500", outlineColor: "teal.500" }}
                                    type="password"
                                    {...register("password", {
                                        minLength: { value: 6, message: "Пароль должен быть не менее 6 символов" }
                                    })}
                                />
                                {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
                            </Field.Root>
                            <Field.Root invalid={!!errors.photoURL}>
                                <Field.Label>Новая автарка</Field.Label>
                                <Input {...register("photoURL")} />
                                <Field.HelperText>Сейчас можно добавить фото только по ссылке. В будущем появится возможность загрузки с устройства! 😊</Field.HelperText>
                                <Field.ErrorText>Error</Field.ErrorText>
                            </Field.Root>
                            <Fieldset.ErrorText>Ошибка изменения формы</Fieldset.ErrorText>
                            <Button type="submit" > Изменить данные </Button>
                        </Fieldset.Content>
                    </form>
                </Fieldset.Root>
            </Container>
        </Box>
    )
}


export default ProfileEdit