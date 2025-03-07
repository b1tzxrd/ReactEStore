// import { createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from 'firebase/auth';
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FieldErrorText, FieldLabel, FieldRequiredIndicator, FieldRoot, Fieldset, Input, ProgressCircle } from "@chakra-ui/react"
import { useState } from 'react';
import { useColorMode } from '../ui/color-mode';
import { Toaster, toaster } from "@/components/ui/toaster"
import { authService } from '@/services/authService';
import { FirebaseError } from 'firebase/app';
import { useQueryClient } from "@tanstack/react-query";

export type RegInputs = {
    name?: string,
    email: string,
    password: string
}

const RegForm: React.FC = () => {
    const { colorMode } = useColorMode();
    const [isOpen, setIsOpen] = useState(false);
    const queryClient = useQueryClient()
    const { mutate: registerUser, isPending } = authService.useRegisterMutation()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
        setError
    } = useForm<RegInputs>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
        mode: "all",
    });


    // const handleRegister: SubmitHandler<RegInputs> = (data) => {
    //     setIsLoading(true);
    //     const auth = getAuth();

    //     createUserWithEmailAndPassword(auth, data.email, data.password)
    //     .then(async (userCredential) => {
    //         const user = userCredential.user;

    //         await updateProfile(user, {
    //             displayName: data.name
    //         });

    //         reset();
    //         setTimeout(() => setIsOpen(false), 2000);

    //         toaster.success({
    //             title: "Вы успешно зарегистрировались",
    //             description: `Добро пожаловать, ${data.name}!`,
    //         });

    //         console.log("registration success", user);

    //         return signOut(auth);
    //     })
    //         .catch((e) => {
    //             console.log("registration error", e.code);

    // switch (e.code) {
    //     case "auth/email-already-in-use":
    //         setError("email", { type: "manual", message: "Этот email уже используется" });
    //         break;
    //     case "auth/invalid-email":
    //         setError("email", { type: "manual", message: "Некорректный email" });
    //         break;
    //     case "auth/weak-password":
    //         setError("password", { type: "manual", message: "Пароль слишком слабый (минимум 6 символов)" });
    //         break;
    //     case "auth/network-request-failed":
    //         setError("root", { type: "manual", message: "Ошибка сети. Проверьте подключение к интернету" });
    //         break;
    //     default:
    //         setError("root", { type: "manual", message: "Неизвестная ошибка. Попробуйте снова" });
    //         break;
    // }
    //         })
    //         .finally(() => setIsLoading(false));
    // };



    const handleRegister: SubmitHandler<RegInputs> = (data) => {
        registerUser(
            { email: data.email, password: data.password, name: data.name },
            {
                onSuccess: (user) => {
                    toaster.success({
                        title: "Вы успешно вошли в свой аккаунт",
                        description: `Добро пожаловать!`,
                    });
                    reset()

                    setIsOpen(false)

                    setTimeout(() => {
                        queryClient.invalidateQueries({ queryKey: ["currentUser"] })
                        queryClient.setQueryData(["currentUser"], user)
                    }, 3000)
                },
                onError: (e: unknown) => {
                    if (e instanceof FirebaseError) {
                        console.log("registration error", e.code);

                        switch (e.code) {
                            case "auth/email-already-in-use":
                                setError("email", { type: "manual", message: "Этот email уже используется" });
                                break;
                            case "auth/invalid-email":
                                setError("email", { type: "manual", message: "Некорректный email" });
                                break;
                            case "auth/weak-password":
                                setError("password", { type: "manual", message: "Пароль слишком слабый (минимум 6 символов)" });
                                break;
                            case "auth/network-request-failed":
                                setError("root", { type: "manual", message: "Ошибка сети. Проверьте подключение к интернету" });
                                break;
                            default:
                                setError("root", { type: "manual", message: "Неизвестная ошибка. Попробуйте снова" });
                                break;
                        }
                    } else {
                        console.error("Unknown error", e);
                        setError("root", { type: "manual", message: "Неизвестная ошибка. Попробуйте снова" });
                    }
                }
            }
        )
    }

    return (
        <DialogRoot onOpenChange={(details) => setIsOpen(details.open)} open={isOpen}>
            <Toaster />
            <DialogTrigger asChild>
                <Button colorPalette="teal" variant="solid" size="sm" onClick={() => setIsOpen(true)}>
                    Зарегистрироваться
                </Button>
            </DialogTrigger>
            <DialogContent border="2px solid" borderColor="teal.500">
                <DialogHeader alignSelf="center">
                    <DialogTitle
                        fontSize="2xl"
                        bgClip="text"
                        bgGradient="to-r"
                        gradientFrom="teal.500"
                        gradientTo="cyan.400">
                        Регистрация
                    </DialogTitle>
                </DialogHeader>
                <DialogBody>
                    <form onSubmit={handleSubmit(handleRegister)}>
                        <Fieldset.Root>
                            <Fieldset.Content>
                                <FieldRoot invalid={!!errors.name} required>
                                    <FieldLabel>
                                        Имя
                                        <FieldRequiredIndicator />
                                    </FieldLabel>
                                    <Input
                                        _focus={{ borderColor: "teal.500", outlineColor: "teal.500" }}
                                        type="text"
                                        {...register("name", {
                                            required: "Это поле не должно быть пустым",
                                            minLength: { value: 2, message: "Имя должно содержать минимум 2 символа" },
                                            maxLength: { value: 30, message: "Имя не может быть длиннее 30 символов" },
                                            pattern: { value: /^[A-Za-zА-Яа-яЁё]+$/, message: "Имя может содержать только буквы и пробелы" }
                                        })} />
                                    {errors.name && <FieldErrorText>{errors.name.message}</FieldErrorText>}
                                </FieldRoot>

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
                                    Зарегистрироваться
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
                <DialogFooter>
                    {errors.root && <FieldErrorText>{errors.root.message}</FieldErrorText>}
                </DialogFooter>
                <DialogCloseTrigger color="tomato" />
            </DialogContent>
        </DialogRoot>
    );
};


export default RegForm

