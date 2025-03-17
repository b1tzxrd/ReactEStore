import { createContext } from "react";
import { User } from "firebase/auth";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    refreshUser: async () => {}, 
});
