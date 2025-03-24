import { avatarUpdate, nameUpdate } from "@/api/updateUser"
import { IAvatarEdtInput } from "@/components/pages/Profile/AvatarEdit"
import { INameEdtInput } from "@/components/pages/Profile/NameEdit"
import { toaster } from "@/components/ui/toaster"
import useAuth from "@/hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import { getAuth } from "firebase/auth"



export const userService = {
    useUpdateDisplayName: () => {
        const {refreshUser} = useAuth()
        const auth = getAuth()

        return useMutation({
            mutationFn: async (data: INameEdtInput) => {
                const user = auth.currentUser
                if (!user) throw new Error("Пользователь не найден");
                await nameUpdate(user, data.displayName);
            },
            onSuccess: async() => {
                await refreshUser()
                toaster.success({
                    title: "Вы успешно изменили имя",
                    placement: "top"
                })
            },
            onError: (error) => {
                toaster.error({
                    title: "Ошибка обновления имени - " + error
                })
            }
        })
    },
    useUpdateAvatar: () => {
        const {refreshUser} = useAuth()
        const auth = getAuth()

        return useMutation({
            mutationFn: async (data: IAvatarEdtInput) => {
                const user = auth.currentUser
                if (!user) throw new Error("Пользователь не найден");
                await avatarUpdate(user, data.photoURL);
            },
            onSuccess: async() => {
                await refreshUser()
            },
            onError: (error) => {
                toaster.error({
                    title: "Ошибка обновления имени - " + error
                })
            }
        })
    }
}

