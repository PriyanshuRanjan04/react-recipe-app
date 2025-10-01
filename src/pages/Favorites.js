import React, { useEffect, useState } from 'react'
import { useRecipes } from '../context/RecipeContext'
import { useAuth } from '../context/AuthContext'
import RecipeCard from '../components/RecipeCard'

export default function Favorites() {
    const { recipes } = useRecipes()
    const { user } = useAuth()
    const [favoriteIds, setFavoriteIds] = useState([])

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('favorites') || '[]')
        const userFavs = user?.favorites || []
        const merged = Array.from(new Set([...local, ...userFavs]))
        setFavoriteIds(merged)
    }, [user])

    const favoriteRecipes = recipes.filter(r => favoriteIds.includes(r.id))

    return (
        <div className="recipes-page">
            <div className="recipes-header">
                <h1>Your Favorites</h1>
                <p>Saved recipes you love</p>
            </div>
            <div className="recipes-container">
                {favoriteRecipes.map((r) => (
                    <RecipeCard key={r.id} recipe={r} />
                ))}
                {favoriteRecipes.length === 0 && (
                    <div className="no-recipes">
                        <h3>No favorites yet</h3>
                        <p>Find recipes and tap the heart to save them</p>
                    </div>
                )}
            </div>
        </div>
    )
}


