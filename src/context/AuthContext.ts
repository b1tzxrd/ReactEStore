import { User } from "firebase/auth";
import { createContext } from "react";

export interface IAuthContext {
    user: User | null;
    loading: boolean;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);