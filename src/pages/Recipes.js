import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Star, Clock, Users, TrendingUp, ChefHat } from 'lucide-react'
import { useRecipes } from '../context/RecipeContext'
import { useAuth } from '../context/AuthContext'
import AdvancedSearch from '../components/search/AdvancedSearch'
import PreviousSearches from "../components/PreviousSearches"
import SkeletonCard from "../components/SkeletonCard"

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
                    <img
                        src={recipe.image}
                        alt={`${recipe.title} — ${recipe.cuisine} cuisine`}
                        loading="lazy"
                        width="640"
                        height="420"
                        srcSet={`${recipe.image}&w=480 480w, ${recipe.image}&w=640 640w, ${recipe.image}&w=960 960w`}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
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
                        <img
                            src={recipe.author.avatar}
                            alt={`${recipe.author.name}, ${recipe.author.cuisine} chef`}
                            loading="lazy"
                            width="32"
                            height="32"
                            srcSet={`${recipe.author.avatar}&w=32 32w, ${recipe.author.avatar}&w=48 48w, ${recipe.author.avatar}&w=64 64w`}
                            sizes="32px"
                        />
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
                setDisplayedRecipes(balanceIndianToGlobal(getTrendingRecipes()))
                break
            case 'popular':
                setDisplayedRecipes(balanceIndianToGlobal(getPopularRecipes()))
                break
            default:
                setDisplayedRecipes(balanceIndianToGlobal(recipes))
        }
    }

    const handleSearch = (filters) => {
        // This will be handled by the RecipeContext
        setDisplayedRecipes(balanceIndianToGlobal(recipes))
    }

    function balanceIndianToGlobal(list) {
        const indian = list.filter(r => r.cuisine === 'Indian')
        const global = list.filter(r => r.cuisine !== 'Indian')
        const targetIndian = Math.max(Math.floor(list.length * 0.7), 1)
        const targetGlobal = list.length - targetIndian
        return [
            ...indian.slice(0, targetIndian),
            ...global.slice(0, targetGlobal)
        ]
    }

    return (
        <div className="recipes-page bg-page-recipes-rose">
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
                <div className="recipes-container">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
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