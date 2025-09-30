import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Clock, Users, TrendingUp, ChefHat } from 'lucide-react'
import { useRecipes } from '../context/RecipeContext'
import { useAuth } from '../context/AuthContext'
import AdvancedSearch from '../components/search/AdvancedSearch'
import PreviousSearches from "../components/PreviousSearches"

const RecipeCard = ({ recipe }) => {
    const { user, addToFavorites, removeFromFavorites } = useAuth()
    const isFavorite = user?.favorites?.includes(recipe.id) || false

    const handleFavoriteToggle = (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (!user) {
            // Redirect to auth page
            return
        }

        if (isFavorite) {
            removeFromFavorites(recipe.id)
        } else {
            addToFavorites(recipe.id)
        }
    }

    return (
        <motion.div
            className="recipe-card"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Link to={`/recipe/${recipe.id}`} className="recipe-link">
                <div className="recipe-image">
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="recipe-overlay">
                        <button
                            className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                            onClick={handleFavoriteToggle}
                        >
                            ♥
                        </button>
                        {recipe.trending && (
                            <div className="trending-badge">
                                <TrendingUp />
                                Trending
                            </div>
                        )}
                    </div>
                </div>

                <div className="recipe-info">
                    <div className="recipe-meta">
                        <span className="cuisine-badge">{recipe.cuisine}</span>
                        <span className="difficulty-badge">{recipe.difficulty}</span>
                    </div>

                    <h3 className="recipe-title">{recipe.title}</h3>
                    <p className="recipe-description">{recipe.description}</p>

                    <div className="recipe-stats">
                        <div className="stat">
                            <Clock />
                            <span>{recipe.cookingTime} min</span>
                        </div>
                        <div className="stat">
                            <Users />
                            <span>{recipe.servings} servings</span>
                        </div>
                        <div className="stat">
                            <Star />
                            <span>{recipe.rating}</span>
                        </div>
                    </div>

                    <div className="recipe-author">
                        <img src={recipe.author.avatar} alt={recipe.author.name} />
                        <span>By {recipe.author.name}</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

export default function Recipes() {
    const { recipes, loading, getTrendingRecipes, getPopularRecipes } = useRecipes()
    const [activeTab, setActiveTab] = useState('all')
    const [displayedRecipes, setDisplayedRecipes] = useState(recipes)

    useEffect(() => {
        setDisplayedRecipes(recipes)
    }, [recipes])

    const handleTabChange = (tab) => {
        setActiveTab(tab)
        switch (tab) {
            case 'trending':
                setDisplayedRecipes(getTrendingRecipes())
                break
            case 'popular':
                setDisplayedRecipes(getPopularRecipes())
                break
            default:
                setDisplayedRecipes(recipes)
        }
    }

    const handleSearch = (filters) => {
        // This will be handled by the RecipeContext
        setDisplayedRecipes(recipes)
    }

    return (
        <div className="recipes-page">
            <div className="recipes-header">
                <h1>Discover Amazing Recipes</h1>
                <p>Find your next favorite dish from our collection of delicious recipes</p>
            </div>

            <AdvancedSearch onSearch={handleSearch} />

            <div className="recipes-tabs">
                <button
                    className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => handleTabChange('all')}
                >
                    All Recipes
                </button>
                <button
                    className={`tab ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => handleTabChange('trending')}
                >
                    <TrendingUp />
                    Trending
                </button>
                <button
                    className={`tab ${activeTab === 'popular' ? 'active' : ''}`}
                    onClick={() => handleTabChange('popular')}
                >
                    <Star />
                    Popular
                </button>
            </div>

            <PreviousSearches />

            {loading ? (
                <div className="loading">Loading recipes...</div>
            ) : (
                <motion.div
                    className="recipes-container"
                    layout
                >
                    {displayedRecipes.map((recipe) => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </motion.div>
            )}

            {displayedRecipes.length === 0 && !loading && (
                <div className="no-recipes">
                    <ChefHat />
                    <h3>No recipes found</h3>
                    <p>Try adjusting your search criteria or browse all recipes</p>
                </div>
            )}
        </div>
    )
}