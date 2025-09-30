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
        title: 'Chicken Pan Pizza',
        description: 'A delicious homemade pizza with crispy crust and fresh toppings',
        image: '/img/gallery/img_1.jpg',
        author: {
            id: '1',
            name: 'Juan Carlos',
            avatar: '/img/top-chiefs/img_1.jpg',
            cuisine: 'Mexican'
        },
        cuisine: 'Italian',
        difficulty: 'Medium',
        cookingTime: 45,
        servings: 4,
        rating: 4.5,
        reviewCount: 128,
        tags: ['pizza', 'italian', 'dinner', 'family'],
        ingredients: [
            { name: 'Pizza dough', amount: '1 lb', unit: 'lb' },
            { name: 'Chicken breast', amount: '2', unit: 'pieces' },
            { name: 'Mozzarella cheese', amount: '2 cups', unit: 'cups' },
            { name: 'Tomato sauce', amount: '1/2 cup', unit: 'cup' },
            { name: 'Olive oil', amount: '2 tbsp', unit: 'tbsp' }
        ],
        instructions: [
            'Preheat oven to 450°F (230°C)',
            'Roll out the pizza dough on a floured surface',
            'Cook chicken breast and slice into strips',
            'Spread tomato sauce on dough',
            'Add chicken, cheese, and other toppings',
            'Bake for 12-15 minutes until golden'
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
        title: 'Spaghetti and Meatballs',
        description: 'Classic Italian pasta with homemade meatballs in rich tomato sauce',
        image: '/img/gallery/img_4.jpg',
        author: {
            id: '2',
            name: 'John Doe',
            avatar: '/img/top-chiefs/img_2.jpg',
            cuisine: 'Japanese'
        },
        cuisine: 'Italian',
        difficulty: 'Easy',
        cookingTime: 30,
        servings: 6,
        rating: 4.8,
        reviewCount: 95,
        tags: ['pasta', 'italian', 'comfort food', 'dinner'],
        ingredients: [
            { name: 'Spaghetti', amount: '1 lb', unit: 'lb' },
            { name: 'Ground beef', amount: '1 lb', unit: 'lb' },
            { name: 'Breadcrumbs', amount: '1/2 cup', unit: 'cup' },
            { name: 'Egg', amount: '1', unit: 'piece' },
            { name: 'Tomato sauce', amount: '2 cups', unit: 'cups' }
        ],
        instructions: [
            'Mix ground beef, breadcrumbs, and egg for meatballs',
            'Form into 1-inch balls',
            'Brown meatballs in a large skillet',
            'Add tomato sauce and simmer for 20 minutes',
            'Cook spaghetti according to package directions',
            'Serve meatballs and sauce over spaghetti'
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
        title: 'American Cheese Burger',
        description: 'Juicy beef patty with melted cheese, fresh lettuce, and special sauce',
        image: '/img/gallery/img_5.jpg',
        author: {
            id: '3',
            name: 'Erich Maria',
            avatar: '/img/top-chiefs/img_3.jpg',
            cuisine: 'Italian'
        },
        cuisine: 'American',
        difficulty: 'Easy',
        cookingTime: 20,
        servings: 4,
        rating: 4.3,
        reviewCount: 67,
        tags: ['burger', 'american', 'lunch', 'grilled'],
        ingredients: [
            { name: 'Ground beef', amount: '1 lb', unit: 'lb' },
            { name: 'Burger buns', amount: '4', unit: 'pieces' },
            { name: 'Cheddar cheese', amount: '4 slices', unit: 'slices' },
            { name: 'Lettuce', amount: '1 head', unit: 'head' },
            { name: 'Tomato', amount: '2', unit: 'pieces' }
        ],
        instructions: [
            'Form ground beef into 4 patties',
            'Season with salt and pepper',
            'Grill patties for 4-5 minutes per side',
            'Add cheese during last minute of cooking',
            'Toast burger buns lightly',
            'Assemble burgers with lettuce, tomato, and condiments'
        ],
        nutritionalInfo: {
            calories: 520,
            protein: 32,
            carbs: 35,
            fat: 28,
            fiber: 2
        },
        createdAt: '2024-01-08',
        trending: true
    },
    {
        id: '4',
        title: 'Mutton Biriyani',
        description: 'Fragrant basmati rice with tender mutton and aromatic spices',
        image: '/img/gallery/img_6.jpg',
        author: {
            id: '5',
            name: 'Blake Lively',
            avatar: '/img/top-chiefs/img_5.jpg',
            cuisine: 'French'
        },
        cuisine: 'Indian',
        difficulty: 'Hard',
        cookingTime: 120,
        servings: 6,
        rating: 4.7,
        reviewCount: 89,
        tags: ['biriyani', 'indian', 'rice', 'spicy', 'special occasion'],
        ingredients: [
            { name: 'Basmati rice', amount: '2 cups', unit: 'cups' },
            { name: 'Mutton', amount: '1 lb', unit: 'lb' },
            { name: 'Onions', amount: '3 large', unit: 'pieces' },
            { name: 'Yogurt', amount: '1 cup', unit: 'cup' },
            { name: 'Garam masala', amount: '2 tbsp', unit: 'tbsp' }
        ],
        instructions: [
            'Marinate mutton with yogurt and spices for 2 hours',
            'Fry sliced onions until golden brown',
            'Cook mutton with half the fried onions',
            'Parboil rice with whole spices',
            'Layer rice over mutton in a heavy pot',
            'Cover and cook on low heat for 45 minutes'
        ],
        nutritionalInfo: {
            calories: 580,
            protein: 35,
            carbs: 65,
            fat: 18,
            fiber: 4
        },
        createdAt: '2024-01-05',
        trending: false
    },
    {
        id: '5',
        title: 'Japanese Sushi',
        description: 'Fresh salmon and avocado rolls with perfectly seasoned rice',
        image: '/img/gallery/img_10.jpg',
        author: {
            id: '6',
            name: 'Ben Affleck',
            avatar: '/img/top-chiefs/img_6.jpg',
            cuisine: 'Indian'
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
