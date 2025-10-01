import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query'

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null)

    useEffect(() => {
        // Check for stored user data
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(storedToken)
        setLoading(false);
    }, []);

    const loginMutation = useMutation({
        mutationFn: async ({ email, password }) => {
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            })
            if (!res.ok) {
                const data = await res.json().catch(() => ({ message: 'Login failed' }))
                throw new Error(data.message || 'Login failed')
            }
            return res.json()
        },
        onSuccess: (data) => {
            const avatar = data.user?.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(data.user?.name || data.user?.email || 'chef')}`
            const withAvatar = { ...data.user, avatar }
            setUser(withAvatar)
            setToken(data.token)
            localStorage.setItem('user', JSON.stringify(withAvatar))
            localStorage.setItem('token', data.token)
            toast.success('Login successful!')
        },
        onError: (err) => {
            toast.error(err.message || 'Login failed')
        }
    })

    const login = async (email, password) => {
        setLoading(true)
        try {
            await loginMutation.mutateAsync({ email, password })
            return { success: true }
        } catch (e) {
            return { success: false, error: e.message }
        } finally {
            setLoading(false)
        }
    }

    const register = async (name, email, password) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const userData = {
                id: Date.now().toString(),
                name,
                email,
                avatar: '/img/top-chiefs/img_1.jpg',
                joinDate: new Date().toISOString(),
                favorites: [],
                recipes: [],
                following: []
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success('Registration successful!');
            return { success: true };
        } catch (error) {
            toast.error('Registration failed. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null)
        localStorage.removeItem('user');
        localStorage.removeItem('token')
        toast.success('Logged out successfully!');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated!');
    };

    const addToFavorites = async (recipeId) => {
        const local = JSON.parse(localStorage.getItem('favorites') || '[]')
        if (!local.includes(recipeId)) {
            localStorage.setItem('favorites', JSON.stringify([recipeId, ...local]))
        }
        if (!user) return;
        try {
            await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/recipes/${recipeId}/favorite`, {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            })
        } catch { }
        const updatedFavorites = Array.from(new Set([...(user.favorites || []), recipeId]));
        updateProfile({ favorites: updatedFavorites });
    };

    const removeFromFavorites = async (recipeId) => {
        const local = JSON.parse(localStorage.getItem('favorites') || '[]').filter(id => id !== recipeId)
        localStorage.setItem('favorites', JSON.stringify(local))
        if (!user) return;
        try {
            await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/recipes/${recipeId}/favorite`, {
                method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
            })
        } catch { }
        const updatedFavorites = (user.favorites || []).filter(id => id !== recipeId);
        updateProfile({ favorites: updatedFavorites });
    };

    const value = {
        user,
        loading,
        token,
        login,
        register,
        logout,
        updateProfile,
        addToFavorites,
        removeFromFavorites
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
