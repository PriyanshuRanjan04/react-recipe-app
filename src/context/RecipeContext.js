import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const RecipeContext = createContext();

export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};

// Mock recipe data with comprehensive structure (outside component)
const mockRecipes = [
    {
        id: '1',
        title: 'Hyderabadi Biryani',
        description: 'Fragrant basmati rice layered with spiced meat, slow-cooked to perfection',
        image: 'https://images.unsplash.com/photo-1604908176997-43162cea1735?q=80&w=1200&auto=format&fit=crop',
        author: {
            id: '6',
            name: 'Aarav Singh',
            avatar: '/img/top-chiefs/img_6.jpg',
            cuisine: 'Indian'
        },
        cuisine: 'Indian',
        difficulty: 'Medium',
        cookingTime: 45,
        servings: 4,
        rating: 4.5,
        reviewCount: 128,
        tags: ['biryani', 'indian', 'rice', 'dinner'],
        ingredients: [
            { name: 'Basmati rice', amount: '2', unit: 'cups' },
            { name: 'Chicken', amount: '500', unit: 'g' },
            { name: 'Yogurt', amount: '1', unit: 'cup' },
            { name: 'Biryani masala', amount: '2', unit: 'tbsp' },
            { name: 'Onions', amount: '2', unit: 'large' }
        ],
        instructions: [
            'Soak basmati rice for 30 minutes',
            'Marinate chicken with yogurt and spices',
            'Fry onions until golden and set aside',
            'Parboil rice and layer with chicken and onions',
            'Dum cook for 25 minutes until fragrant'
        ],
        nutritionalInfo: {
            calories: 320,
            protein: 25,
            carbs: 35,
            fat: 12,
            fiber: 2
        },
        createdAt: '2024-01-15',
        trending: true
    },
    {
        id: '2',
        title: 'Masala Dosa',
        description: 'Crispy fermented crepes filled with spiced potato masala, served with chutney',
        image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop',
        author: {
            id: '6',
            name: 'Aarav Singh',
            avatar: '/img/top-chiefs/img_6.jpg',
            cuisine: 'Indian'
        },
        cuisine: 'Indian',
        difficulty: 'Easy',
        cookingTime: 30,
        servings: 6,
        rating: 4.8,
        reviewCount: 95,
        tags: ['dosa', 'south indian', 'breakfast'],
        ingredients: [
            { name: 'Dosa batter', amount: '3', unit: 'cups' },
            { name: 'Potatoes', amount: '3', unit: 'pieces' },
            { name: 'Onion', amount: '1', unit: 'piece' },
            { name: 'Mustard seeds', amount: '1', unit: 'tsp' }
        ],
        instructions: [
            'Cook dosa on tawa until crisp',
            'Prepare potato masala with spices',
            'Fill dosa with masala and serve with chutney'
        ],
        nutritionalInfo: {
            calories: 450,
            protein: 28,
            carbs: 55,
            fat: 15,
            fiber: 3
        },
        createdAt: '2024-01-10',
        trending: false
    },
    {
        id: '3',
        title: 'Pani Puri',
        description: 'Crispy puris filled with tangy tamarind water, spiced potatoes and chutneys',
        image: 'https://images.unsplash.com/photo-1645112400698-5a2ab0e86259?q=80&w=1200&auto=format&fit=crop',
        author: {
            id: '6',
            name: 'Aarav Singh',
            avatar: '/img/top-chiefs/img_6.jpg',
            cuisine: 'Indian'
        },
        cuisine: 'Indian',
        difficulty: 'Easy',
        cookingTime: 40,
        servings: 4,
        rating: 4.6,
        reviewCount: 67,
        tags: ['chaat', 'street food', 'snack'],
        ingredients: [
            { name: 'Puris', amount: '24', unit: 'pieces' },
            { name: 'Potatoes', amount: '3', unit: 'pieces' },
            { name: 'Tamarind', amount: '1/4', unit: 'cup' },
            { name: 'Mint', amount: '1/2', unit: 'cup' }
        ],
        instructions: [
            'Prepare pani and fillings',
            'Crack puris, add fillings and pour pani, serve immediately'
        ],
        nutritionalInfo: {
            calories: 300,
            protein: 8,
            carbs: 45,
            fat: 10,
            fiber: 4
        },
        createdAt: '2024-01-08',
        trending: true
    },
    {
        id: '4',
        title: 'Butter Chicken',
        description: 'Creamy tomato gravy with tender chicken, finished with butter and cream',
        image: 'https://images.unsplash.com/photo-1601050690114-b3f4c0b1e4b5?q=80&w=1200&auto=format&fit=crop',
        author: {
            id: '6',
            name: 'Aarav Singh',
            avatar: '/img/top-chiefs/img_6.jpg',
            cuisine: 'Indian'
        },
        cuisine: 'Indian',
        difficulty: 'Medium',
        cookingTime: 60,
        servings: 4,
        rating: 4.8,
        reviewCount: 210,
        tags: ['curry', 'north indian', 'dinner'],
        ingredients: [
            { name: 'Chicken', amount: '500', unit: 'g' },
            { name: 'Tomato puree', amount: '1', unit: 'cup' },
            { name: 'Cream', amount: '1/2', unit: 'cup' },
            { name: 'Butter', amount: '2', unit: 'tbsp' }
        ],
        instructions: [
            'Marinate chicken and cook in tandoori style',
            'Simmer tomato gravy with spices',
            'Combine chicken with gravy, finish with cream and butter'
        ],
        nutritionalInfo: {
            calories: 520,
            protein: 30,
            carbs: 22,
            fat: 28,
            fiber: 3
        },
        createdAt: '2024-01-05',
        trending: false
    },
    {
        id: '5',
        title: 'Sushi',
        description: 'Fresh salmon and avocado rolls with perfectly seasoned rice',
        image: 'https://images.unsplash.com/photo-1548365328-9f547fb095de?q=80&w=1200&auto=format&fit=crop',
        author: {
            id: '2',
            name: 'John Doe',
            avatar: '/img/top-chiefs/img_2.jpg',
            cuisine: 'Japanese'
        },
        cuisine: 'Japanese',
        difficulty: 'Hard',
        cookingTime: 90,
        servings: 4,
        rating: 4.9,
        reviewCount: 156,
        tags: ['sushi', 'japanese', 'raw fish', 'healthy', 'lunch'],
        ingredients: [
            { name: 'Sushi rice', amount: '2 cups', unit: 'cups' },
            { name: 'Fresh salmon', amount: '8 oz', unit: 'oz' },
            { name: 'Avocado', amount: '2', unit: 'pieces' },
            { name: 'Nori sheets', amount: '4', unit: 'sheets' },
            { name: 'Rice vinegar', amount: '1/4 cup', unit: 'cup' }
        ],
        instructions: [
            'Cook sushi rice and season with rice vinegar',
            'Slice salmon and avocado into thin strips',
            'Place nori on bamboo mat',
            'Spread rice evenly on nori',
            'Add salmon and avocado in center',
            'Roll tightly and slice into pieces'
        ],
        nutritionalInfo: {
            calories: 280,
            protein: 22,
            carbs: 45,
            fat: 8,
            fiber: 3
        },
        createdAt: '2024-01-12',
        trending: true
    }
];

export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        cuisine: '',
        difficulty: '',
        cookingTime: '',
        search: '',
        tags: []
    });

    useEffect(() => {
        // Load mock data
        setRecipes(mockRecipes);
    }, []);

    const searchRecipes = async (query) => {
        setLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));

            const filtered = mockRecipes.filter(recipe =>
                recipe.title.toLowerCase().includes(query.toLowerCase()) ||
                recipe.description.toLowerCase().includes(query.toLowerCase()) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
            );

            setRecipes(filtered);
            return filtered;
        } catch (error) {
            toast.error('Search failed. Please try again.');
            return [];
        } finally {
            setLoading(false);
        }
    };

    const filterRecipes = (newFilters) => {
        setFilters(newFilters);

        let filtered = mockRecipes;

        if (newFilters.search) {
            filtered = filtered.filter(recipe =>
                recipe.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
                recipe.description.toLowerCase().includes(newFilters.search.toLowerCase()) ||
                recipe.tags.some(tag => tag.toLowerCase().includes(newFilters.search.toLowerCase()))
            );
        }

        if (newFilters.cuisine) {
            filtered = filtered.filter(recipe => recipe.cuisine === newFilters.cuisine);
        }

        if (newFilters.difficulty) {
            filtered = filtered.filter(recipe => recipe.difficulty === newFilters.difficulty);
        }

        if (newFilters.cookingTime) {
            const timeRanges = {
                'quick': [0, 30],
                'medium': [31, 60],
                'long': [61, 999]
            };
            const [min, max] = timeRanges[newFilters.cookingTime] || [0, 999];
            filtered = filtered.filter(recipe => recipe.cookingTime >= min && recipe.cookingTime <= max);
        }

        if (newFilters.tags.length > 0) {
            filtered = filtered.filter(recipe =>
                newFilters.tags.some(tag => recipe.tags.includes(tag))
            );
        }

        setRecipes(filtered);
    };

    const getRecipeById = (id) => {
        return mockRecipes.find(recipe => recipe.id === id);
    };

    const getTrendingRecipes = () => {
        return mockRecipes.filter(recipe => recipe.trending);
    };

    const getPopularRecipes = () => {
        return [...mockRecipes].sort((a, b) => b.rating - a.rating).slice(0, 6);
    };

    const addRecipe = (recipeData) => {
        const newRecipe = {
            id: Date.now().toString(),
            ...recipeData,
            createdAt: new Date().toISOString(),
            trending: false
        };
        setRecipes(prev => [newRecipe, ...prev]);
        toast.success('Recipe added successfully!');
        return newRecipe;
    };

    const updateRecipe = (id, updates) => {
        setRecipes(prev => prev.map(recipe =>
            recipe.id === id ? { ...recipe, ...updates } : recipe
        ));
        toast.success('Recipe updated successfully!');
    };

    const deleteRecipe = (id) => {
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
        toast.success('Recipe deleted successfully!');
    };

    const value = {
        recipes,
        loading,
        filters,
        searchRecipes,
        filterRecipes,
        getRecipeById,
        getTrendingRecipes,
        getPopularRecipes,
        addRecipe,
        updateRecipe,
        deleteRecipe
    };

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    );
};

export default RecipeContext;
