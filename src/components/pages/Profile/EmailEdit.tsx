import { toaster } from "@/components/ui/toaster";
import useAuth from "@/hooks/useAuth";
import { Card, Field, HStack, Input, Button } from "@chakra-ui/react";
import { FirebaseError } from "firebase/app";
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail, sendEmailVerification } from "firebase/auth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export interface IEmailEditInput {
    email: string;
    password: string;
}

const EmailEdit: React.FC = () => {
    const { user } = useAuth();
    
    const { 
        register, 
        handleSubmit,
        setValue,
        watch, 
        formState: { errors } 
    } = useForm<IEmailEditInput>();

    useEffect(() => {
        if (user) {
            setValue("email", user?.email || "");
        }
    }, [user, setValue]);

    const onSubmit = async (data: IEmailEditInput) => {
        if (!user) return;

        try {
            // 1. Создаём credential для реаутентификации
            const credential = EmailAuthProvider.credential(user.email!, data.password);

            // 2. Реаутентифицируем пользователя
            await reauthenticateWithCredential(user, credential);

            // 3. Обновляем email
            await updateEmail(user, data.email);
            toaster.success({ title: "Email успешно обновлён" });

            // 4. Отправляем подтверждение на новую почту
            await sendEmailVerification(user);
            toaster.create({ type: "info", title: "Подтвердите новый email" });

        } catch (error: unknown) {
            if (error instanceof FirebaseError) {
                switch (error.code) {
                    case "auth/wrong-password":
                        toaster.error({ title: "Ошибка", description: "Неверный пароль" });
                        break;
                    case "auth/email-already-in-use":
                        toaster.error({ title: "Ошибка", description: "Данный email уже используется" });
                        break;
                    default:    
                        toaster.error({ title: "Ошибка", description: error.message });
                        break;
                }
            } else {
                toaster.error({ title: "Ошибка", description: "Что-то пошло не так" });
            }
            
        }
    };

    return (
        <Card.Root size="md" variant="subtle" mt={4} >
            <form onSubmit={handleSubmit(onSubmit)} >
                <Card.Header> Изменить вашу почту </Card.Header>
                <Card.Body>
                    <Field.Root invalid={!!errors.email} >
                        <Field.Label>Ваша Электронная Почта</Field.Label>
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
                                        await sendEmailVerification(user)
                                            .then(() => toaster.success({ title: "Письмо отправлено" }))
                                            .catch((e) => toaster.error({ title: "Ошибка отправки письма: " + e.message }));
                                    }
                                }} >Подтвердить</Button>
                            )}
                        </HStack>
                        {!user?.emailVerified && <Field.HelperText>Вы можете изменить почту только после подтверждения.</Field.HelperText>}
                        {errors.email && <Field.ErrorText>{errors.email.message}</Field.ErrorText>}
                    </Field.Root>

                    {/* Поле для пароля, если email изменён */}
                    {watch("email") !== user?.email && user?.emailVerified ? (
                        <Field.Root mt={2}>
                            <Field.Label>Подтвердите пароль</Field.Label>
                            <HStack w="100%">
                                <Input
                                    placeholder="Введите ваш пароль"
                                    type="password"
                                    {...register("password", { required: "Введите пароль" })}
                                />
                            </HStack>
                            {errors.password && <Field.ErrorText>{errors.password.message}</Field.ErrorText>}
                        </Field.Root>
                    ) : null}
                </Card.Body>
                <Card.Footer>
                    <Button type="submit">Обновить</Button>
                </Card.Footer>
            </form>
        </Card.Root>
    );
};

export default EmailEdit;
