"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/lib/api";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const { data } = await api.get("/auth/dashboard");
            setUser(data.user);
            localStorage.setItem("sweet_user", JSON.stringify(data.user));
        } catch {
            setUser(null);
            localStorage.removeItem("sweet_user");
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            const { data } = await api.post("/auth/login", { email, password });
            setUser(data.user);
            localStorage.setItem("sweet_user", JSON.stringify(data.user));
            router.push("/dashboard"); 
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Login failed" };
        }
    };

    const register = async (name, email, password) => {
        try {
            const { data } = await api.post("/auth/register", { name, email, password });
            setUser(data.user);
            localStorage.setItem("sweet_user", JSON.stringify(data.user));
            router.push("/dashboard"); 
            return { success: true };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Registration failed" };
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
            localStorage.removeItem("sweet_user");
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
