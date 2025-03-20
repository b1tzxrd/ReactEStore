import { createContext } from "react";
import { User } from "firebase/auth";

export interface IAuthContext {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    loading: true,
    refreshUser: async () => {}, 
});
