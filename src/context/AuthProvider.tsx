import { auth } from "../../firebase";  // Поправь на реальный путь к конфигу
import { onAuthStateChanged, User } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";



const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;