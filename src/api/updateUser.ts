// import { toaster } from "@/components/ui/toaster"
import { toaster } from "@/components/ui/toaster"
import { updateProfile, User } from "firebase/auth"

export const nameUpdate = async (user: User, name: string): Promise<void> => {
    
    if (!user) throw new Error("Пользователь не найден")

    try {
        await updateProfile(user, {displayName: name})
            .then(() => {
                toaster.success({
                    title: `${user.displayName}, вы успешно изменили имя`
                })
            })
            .catch(e => toaster.error({
                title: "Огибка в изменении имени - " + e.message
            }))
    } catch (error) {
        console.log(error)
    }
}

export const avatarUpdate = async (user: User, photoURL: string): Promise<void> => {
    
    if (!user) throw new Error("Пользователь не найден")

    try {
        await updateProfile(user, {photoURL})
            .then(() => {
                toaster.success({
                    title: `${user.displayName}, вы успешно изменили аватар`
                })
            })
            .catch(e => toaster.error({
                title: "Огибка в изменении аватара - " + e.message
            }))
    } catch (error) {
        console.log(error)
    }
}