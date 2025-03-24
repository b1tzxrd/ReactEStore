import { useColorMode } from "@/components/ui/color-mode"
import { Toaster } from "@/components/ui/toaster"
import useAuth from "@/hooks/useAuth"
import { userService } from "@/services/userService"
import { Button, Card, Field, Input, ProgressCircle } from "@chakra-ui/react"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

export interface INameEdtInput {
    displayName: string
}

const NameEdit: React.FC = () => {

    const { colorMode } = useColorMode()
    const { user } = useAuth()
    const {
        register,
        setValue,
        handleSubmit,
        watch,
        setError,
        formState: { errors, isValid }
    } = useForm<INameEdtInput>({
        mode: "all",
        defaultValues: {
            displayName: user?.displayName || ""
        }
    })
    const { mutate: updateUser, isPending } = userService.useUpdateDisplayName()

    useEffect(() => {
        if (user) {
            setValue("displayName", user.displayName || "")
        }
    }, [user, setValue])


    const onSubmit = async (data: INameEdtInput) => {
        if (user?.displayName === data.displayName) {
            setError("displayName", { type: "manual", message: "У вас уже используется данное имя" })
        } else {
            await updateUser(data)
        }
    }

    return (
        <Card.Root size="md" variant="subtle" >
            <Toaster />
            <form onSubmit={handleSubmit(onSubmit)} >
                <Card.Header> Изменить ваше имя </Card.Header>
                <Card.Body>
                    <Field.Root invalid={!!errors.displayName} >
                        <Field.Label>Ваше Имя</Field.Label>
                        <Input
                            _focus={errors.displayName ? { outlineColor: "border.error" } : { borderColor: "teal.500", outlineColor: "teal.500" }}
                            type="text"
                            {...register("displayName", {
                                required: "Имя не может быть пустым",
                                minLength: { value: 2, message: "Имя должно содержать минимум 2 символа" },
                                maxLength: { value: 30, message: "Имя не может быть длиннее 30 символов" },
                                pattern: { value: /^[A-Za-zА-Яа-яЁё]+$/, message: "Имя может содержать только буквы и пробелы" }
                            })} />
                        {errors.displayName && <Field.ErrorText>{errors.displayName.message}</Field.ErrorText>}
                    </Field.Root>
                </Card.Body>
                <Card.Footer>
                    <Button disabled={!isValid || watch("displayName") === user?.displayName || !watch("displayName").length } variant="solid" colorPalette="teal" type="submit" alignSelf="flex-end" mt={3}>
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
        </Card.Root>
    )
}

export default NameEdit