import { authorizationUser, logoutUser, registerUser, updateDataUser } from "@/api/auth"
import { IFormInputs } from "@/components/pages/ProfileEdit/ProfileEdit";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { getAuth } from "firebase/auth";

export const authService = {
    // useCurrentUser: () => {
    //     return useQuery({
    //         queryKey: ["currentUser"],
    //         queryFn: getCurrentUser,
    //         staleTime: Infinity,  // Не перезапрашиваем, один раз узнали — и все
    //         initialData: getAuth().currentUser,
    //     });
    // },
    useRegisterMutation: () => {

        return useMutation({
            mutationFn: registerUser
        });
    },
    useAuthorizationMutation: () => {

        return useMutation({
            mutationFn: authorizationUser,
        });
    },
    useLogoutMutation: () => {
        const queryClient = useQueryClient();

        return useMutation({
            mutationFn: logoutUser,
            onSuccess: () => {
                queryClient.setQueryData(["currentUser"], null);
            },
        });
    },
    useUpdateUser: () => {
        const { refreshUser } = useAuth()
        const auth = getAuth()

        return useMutation({
            mutationFn: async (data: Partial<IFormInputs>) => {
                const user = auth.currentUser
                if (!user) throw new Error("Пользователь не найден");
                await updateDataUser(user, data);
            },
            onSuccess: async () => {
                await refreshUser(); // Теперь `user` обновится в AuthContext
                console.log(getAuth().currentUser)
            },
            onError: (error) => {
                console.error("Ошибка обновления профиля:", error);
            }
        });
    }
};


