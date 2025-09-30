import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

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

    useEffect(() => {
        // Check for stored user data
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            setLoading(true);
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Mock user data
            const userData = {
                id: '1',
                name: 'John Doe',
                email,
                avatar: '/img/top-chiefs/img_1.jpg',
                joinDate: new Date().toISOString(),
                favorites: [],
                recipes: [],
                following: []
            };

            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            toast.success('Login successful!');
            return { success: true };
        } catch (error) {
            toast.error('Login failed. Please try again.');
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

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
        localStorage.removeItem('user');
        toast.success('Logged out successfully!');
    };

    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        toast.success('Profile updated!');
    };

    const addToFavorites = (recipeId) => {
        if (!user) return;
        const updatedFavorites = [...user.favorites, recipeId];
        updateProfile({ favorites: updatedFavorites });
    };

    const removeFromFavorites = (recipeId) => {
        if (!user) return;
        const updatedFavorites = user.favorites.filter(id => id !== recipeId);
        updateProfile({ favorites: updatedFavorites });
    };

    const value = {
        user,
        loading,
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
