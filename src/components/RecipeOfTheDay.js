import React, { useMemo } from "react"
import { motion } from "framer-motion"
import { useRecipes } from "../context/RecipeContext"

export default function RecipeOfTheDay() {
    const { recipes } = useRecipes()
    const pick = useMemo(() => {
        if (!recipes || recipes.length === 0) return null
        const index = new Date().getDate() % recipes.length
        return recipes[index]
    }, [recipes])

    if (!pick) return null

    return (
        <div className="section d-block recipe-of-day bg-rod-amber-rose">
            <motion.div
                className="rod-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="media">
                    <img
                        src={pick.image}
                        alt={`${pick.title} — ${pick.cuisine} cuisine`}
                        loading="lazy"
                        width="320"
                        height="200"
                        srcSet={`${pick.image}&w=320 320w, ${pick.image}&w=480 480w, ${pick.image}&w=640 640w`}
                        sizes="(max-width: 640px) 100vw, 320px"
                    />
                </div>
                <div className="content">
                    <h2>Recipe of the Day</h2>
                    <h3>{pick.title}</h3>
                    <p>{pick.description}</p>
                    <div className="meta">
                        <span>{pick.cuisine}</span>
                        <span>{pick.cookingTime} min</span>
                        <span>⭐ {pick.rating}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}


