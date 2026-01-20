import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
    exp: number;
}

interface User {
    username: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (userData: User, token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const storedUser: string | null = localStorage.getItem("user");
        const storedToken: string | null = localStorage.getItem("token");

        if (storedUser && storedToken) {
            const decoded = jwtDecode<JwtPayload>(storedToken);
            const currentTime = Date.now() / 1000;

            if (decoded && decoded.exp < currentTime) { //Token expired
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                setUser(null);
                setToken(null);
            } else {
                setUser(JSON.parse(storedUser) as User);
                setToken(storedToken);
            }
        }
        setLoading(false);
    }, []);

    const login = (userData: User, token: string) => {
        console.log(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
        setUser(userData);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};