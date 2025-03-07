import { Button } from "@/components/ui/button"
import {
    // DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    // DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldErrorText, FieldLabel, FieldRequiredIndicator, FieldRoot, Fieldset, Input, ProgressCircle } from "@chakra-ui/react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useColorMode } from "../ui/color-mode"
import { authService } from "@/services/authService"
import { useQueryClient } from "@tanstack/react-query"
import { toaster, Toaster } from "../ui/toaster"
import { FirebaseError } from "firebase/app"
import { useState } from "react"

export type AuthInputs = {
    email: string,
    password: string
}

const AuthForm = () => {

    const { colorMode } = useColorMode()
    const [isOpen, setIsOpen] = useState<boolean>(false);


    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setError
    } = useForm<AuthInputs>({
        mode: "all",
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const queryClient = useQueryClient()
    const { mutate: authorizationUser, isPending } = authService.useAuthorizationMutation()

    const handleAuthorization: SubmitHandler<AuthInputs> = ({ email, password }) => {
        authorizationUser(
            { email, password },
            {
                onSuccess: (user) => {
                    toaster.success({
                        title: "Вы успешно вошли в свой аккаунт",
                        description: `Добро пожаловать!`,
                    });
                    reset()

                    setTimeout(() => {
                        queryClient.invalidateQueries({ queryKey: ["currentUser"] })
                        queryClient.setQueryData(["currentUser"], user)
                    }, 3000)
                },
                onError: (e: unknown) => {
                    if (e instanceof FirebaseError) {
                        console.log("authorization error", e.code);
                        switch (e.code) {
                            case "auth/invalid-email":
                                setError("email", { type: "manual", message: "Некорректный email" });
                                break;
                            case "auth/user-not-found":
                                setError("email", { type: "manual", message: "Пользователь не найден" });
                                break;
                            case "auth/wrong-password":
                                setError("password", { type: "manual", message: "Неверный пароль" });
                                break;
                            case "auth/too-many-requests":
                                setError("root", { type: "manual", message: "Слишком много попыток входа. Попробуйте позже." });
                                break;
                            case "auth/network-request-failed":
                                setError("root", { type: "manual", message: "Ошибка сети. Проверьте подключение к интернету." });
                                break;
                            default:
                                setError("root", { type: "manual", message: "Неизвестная ошибка. Попробуйте снова." });
                                break;
                        }
                    } else {
                        console.error("Unknown error", e);
                        setError("root", { type: "manual", message: "Неизвестная ошибка. Попробуйте снова." });
                    }
                },
            }
        )
    }

    return (
        <DialogRoot onOpenChange={(details) => setIsOpen(details.open)} open={isOpen}>
            <Toaster/>
            <DialogTrigger asChild>
                <Button colorPalette="teal" variant="surface" size="sm">
                    Войти
                </Button>
            </DialogTrigger>
            <DialogContent m={{ base: "60px 10px 0px 10px", smOnly: "60px 10px 0px 10px" }} >
                <DialogHeader alignSelf="center">
                    <DialogTitle
                        fontSize="2xl"
                        bgClip="text"
                        bgGradient="to-r"
                        gradientFrom="teal.500"
                        gradientTo="cyan.400">Авторизация</DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(handleAuthorization)}>
                        <Fieldset.Root size="lg" maxW="md">
                            <Fieldset.Content>

                                <FieldRoot invalid={!!errors.email} required>
                                    <FieldLabel>
                                        Электронная почта
                                        <FieldRequiredIndicator />
                                    </FieldLabel>
                                    <Input
                                        _focus={{ borderColor: "teal.500", outlineColor: "teal.500" }}
                                        type="email"
                                        {...register("email", {
                                            required: "Это поле не должно быть пустым",
                                            pattern: { value: /^\S+@\S+\.\S+$/, message: "Некорректный email" }
                                        })}
                                        required />
                                    {errors.email && <FieldErrorText>{errors.email.message}</FieldErrorText>}
                                </FieldRoot>

                                <FieldRoot invalid={!!errors.password} required>
                                    <FieldLabel>
                                        Пароль
                                        <FieldRequiredIndicator />
                                    </FieldLabel>
                                    <Input
                                        _focus={{ borderColor: "teal.500", outlineColor: "teal.500" }}
                                        type="password"
                                        {...register("password", {
                                            required: "Это поле не должно быть пустым",
                                            minLength: { value: 6, message: "Пароль должен быть не менее 6 символов" }
                                        })}
                                        required />
                                    {errors.password && <FieldErrorText>{errors.password.message}</FieldErrorText>}
                                </FieldRoot>
                                <Button disabled={!isValid} variant="solid" colorPalette="teal" type="submit" alignSelf="flex-end" mt={3}>
                                    Отправить
                                    {isPending && (
                                        <ProgressCircle.Root value={null} size="sm">
                                            <ProgressCircle.Circle>
                                                <ProgressCircle.Track />
                                                <ProgressCircle.Range stroke={colorMode === "dark" ? "teal.100" : "teal.600"} />
                                            </ProgressCircle.Circle>
                                        </ProgressCircle.Root>
                                    )}
                                </Button>
                            </Fieldset.Content>
                        </Fieldset.Root>
                    </form>
                </DialogBody>
                <DialogCloseTrigger />
            </DialogContent>
        </DialogRoot>
    )
}


export default AuthForm