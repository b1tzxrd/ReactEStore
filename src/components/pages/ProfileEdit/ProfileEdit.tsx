import { useState } from "react";
import { Box, Container, Heading, Input, Button, Text,Fieldset, FieldErrorText, FieldLabel, FieldRequiredIndicator, FieldRoot, ProgressCircle } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { useColorMode } from "@/components/ui/color-mode";

interface IFormInput {
    displayName: string;
    email: string,
    password: string
}

const ProfileEdit = () => {

    const { colorMode } = useColorMode()
    const { user, loading, refreshUser } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors, isSubmitting, isValid } } = useForm<IFormInput>({
        defaultValues: {
            displayName: user?.displayName || "",
            email: user?.email || ""
        }
    });

    const [error, setError] = useState<string | null>(null);

    const onSubmit = async (data: IFormInput) => {
        if (!user) return;
        setError(null);

        try {
            await updateProfile(user, { displayName: data.displayName });
            await refreshUser(); // Обновляем данные в useAuth
            navigate("/profile");
        } catch (err) {
            setError("Ошибка при обновлении профиля " + err);
        }
    };

    if (loading) return <Text>Загрузка...</Text>;

    return (
        <Box bgColor="Background">
            <Container minH="calc(100vh - 70px - 40px)" pt={10} pb={10}>
                <Heading as="h2" size="5xl" textAlign="center">Редактирование профиля</Heading>
                {/* <Fieldset.Root>
                    <Fieldset.Content>
                        <Field.Root invalid={!!errors.displayName} >
                            <Field.Label>Ваше имя</Field.Label>
                            <Input {...register("displayName", { required: "Введите имя", minLength: 2 })} />
                            {errors.displayName && <Field.ErrorText>{errors.displayName.message}</Field.ErrorText>}
                        </Field.Root>
                        <Field.Root invalid={!!errors.displayName} >
                            <Field.Label>Ваше имя</Field.Label>
                            <Input {...register("displayName", { required: "Введите имя", minLength: 2 })} />
                            {errors.displayName && <Field.ErrorText>{errors.displayName.message}</Field.ErrorText>}
                        </Field.Root>
                        <Button type="submit" loading={isSubmitting} >Изменить</Button>
                    </Fieldset.Content>
                    <Fieldset.ErrorText>
                        {error}
                    </Fieldset.ErrorText>
                </Fieldset.Root> */}
                <Fieldset.Root as="form" onSubmit={handleSubmit(onSubmit)} size="lg" invalid>
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
                            {isSubmitting && (
                                <ProgressCircle.Root value={null} size="sm">
                                    <ProgressCircle.Circle>
                                        <ProgressCircle.Track />
                                        <ProgressCircle.Range stroke={colorMode === "dark" ? "teal.100" : "teal.600"} />
                                    </ProgressCircle.Circle>
                                </ProgressCircle.Root>
                            )}
                        </Button>
                    </Fieldset.Content>
                    <Fieldset.ErrorText>
                        {error}
                    </Fieldset.ErrorText>
                </Fieldset.Root>

            </Container>
        </Box>
    );
};

export default ProfileEdit;
