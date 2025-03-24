import { useColorMode } from "@/components/ui/color-mode"
import { Toaster } from "@/components/ui/toaster"
import useAuth from "@/hooks/useAuth"
import { userService } from "@/services/userService"
import { Button, Card, Field, Image, Input, ProgressCircle, Stack } from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export interface IAvatarEdtInput {
    photoURL: string
}

const AvatarEdit: React.FC = () => {

    const { colorMode } = useColorMode()
    const { user } = useAuth()
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isValid }
    } = useForm<IAvatarEdtInput>({
        mode: "all",
        defaultValues: {
            photoURL: user?.photoURL || ""
        }
    })
    const { mutate: updateAvatar, isPending } = userService.useUpdateAvatar()

    useEffect(() => {
        if (user) {
            setValue("photoURL", user.photoURL || "")
        }
    }, [user, setValue])


    const onSubmit = async (data: IAvatarEdtInput) => {
        if (user?.photoURL === data.photoURL) {
            setError("photoURL", { type: "manual", message: "У вас уже используется данное аватарка" })
        } else {
            await updateAvatar(data)
        }
    }

    return (
        <>
            <Toaster />
            <Card.Root size="md" variant="subtle" mt={4} >
                <Stack flexDir={"row"} justifyContent={"space-between"} wrap={"wrap"} >
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <Card.Header> Изменить ваш аватар </Card.Header>
                        <Card.Body>
                            <Field.Root invalid={!!errors.photoURL} >
                                <Field.Label>Ссылка на картинку</Field.Label>
                                <Input
                                    _focus={errors.photoURL ? { outlineColor: "border.error" } : { borderColor: "teal.500", outlineColor: "teal.500" }}
                                    type="text"
                                    {...register("photoURL", {
                                        required: "Ссылка не может быть пустая",
                                    })} />
                                {errors.photoURL && <Field.ErrorText>{errors.photoURL.message}</Field.ErrorText>}
                                <Field.HelperText>Сейчас можно добавить фото только по ссылке. В будущем появится возможность загрузки с устройства! 😊</Field.HelperText>
                            </Field.Root>
                        </Card.Body>
                        <Card.Footer>
                            <Button disabled={!isValid || watch("photoURL") === user?.photoURL || !watch("photoURL").length} variant="solid" colorPalette="teal" type="submit" alignSelf="flex-end" mt={3}>
                                Обновить
                                {isPending && (
                                    <ProgressCircle.Root value={null} size="sm">
                                        <ProgressCircle.Circle>
                                            <ProgressCircle.Track />
                                            <ProgressCircle.Range stroke={colorMode === "dark" ? "teal.100" : "teal.600"} />
                                        </ProgressCircle.Circle>
                                    </ProgressCircle.Root>
                                )}
                            </Button>
                        </Card.Footer>
                    </form>
                    {
                        isPending ? (
                            <ProgressCircle.Root value={null} size="sm">
                                <ProgressCircle.Circle>
                                    <ProgressCircle.Track />
                                    <ProgressCircle.Range stroke={colorMode === "dark" ? "teal.100" : "teal.600"} />
                                </ProgressCircle.Circle>
                            </ProgressCircle.Root>
                        ) : !user?.photoURL ? null : (
                            <Image w="250px" src={user?.photoURL || "Без имени"} />
                        )
                    }
                </Stack>
            </Card.Root>
        </>
    )
}

export default AvatarEdit