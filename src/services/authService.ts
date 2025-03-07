import { authorizationUser, logoutUser, registerUser } from "@/api/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"

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
};


