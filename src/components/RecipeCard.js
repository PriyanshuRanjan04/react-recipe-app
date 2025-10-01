import CustomImage from "./CustomImage"
import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { Heart } from "lucide-react"

export default function RecipeCard({ recipe }) {
    const { user, addToFavorites, removeFromFavorites } = useAuth()
    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        const local = JSON.parse(localStorage.getItem('favorites') || '[]')
        const userFavs = user?.favorites || []
        setIsFavorite(local.includes(recipe.id) || userFavs.includes(recipe.id))
    }, [user, recipe.id])

    return (
        <div className="recipe-card">
            <div style={{ position: 'relative' }}>
                <CustomImage imgSrc={recipe.image} pt="65%" />
                <button
                    className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={(e) => {
                        e.preventDefault()
                        if (isFavorite) {
                            removeFromFavorites(recipe.id)
                            setIsFavorite(false)
                        } else {
                            addToFavorites(recipe.id)
                            setIsFavorite(true)
                        }
                    }}
                    style={{ position: 'absolute', top: 8, right: 8 }}
                >
                    <Heart className={isFavorite ? 'filled' : ''} />
                </button>
            </div>
            <div className="recipe-card-info">
                <img
                    className="auther-img"
                    src={recipe.authorImg}
                    alt={`${recipe.title} author`}
                    loading="lazy"
                    width="40"
                    height="40"
                    srcSet={`${recipe.authorImg}&w=40 40w, ${recipe.authorImg}&w=60 60w, ${recipe.authorImg}&w=80 80w`}
                    sizes="40px"
                />
                <p className="recipe-title">{recipe.title}</p>
                <p className="recipe-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                <a className="view-btn" href="#!">VIEW RECIPE</a>
            </div>
        </div>
    )
}