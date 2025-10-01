import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRecipes } from "../context/RecipeContext"

const REGIONS = ["Indian", "Italian", "Chinese", "Mexican", "American", "Japanese", "French"]

export default function DiscoverByRegion() {
    const { recipes } = useRecipes()
    const [active, setActive] = useState("Indian")

    const filtered = useMemo(() => {
        return recipes.filter(r => r.cuisine === active)
    }, [recipes, active])

    return (
        <div className="section d-block discover-region bg-region-saffron-grid">
            <h1 className="title">Discover by Region</h1>
            <div className="tabs">
                {REGIONS.map(region => (
                    <button
                        key={region}
                        className={`tab ${active === region ? 'active' : ''}`}
                        onClick={() => setActive(region)}
                    >
                        {region}
                    </button>
                ))}
            </div>

            <div className="region-grid">
                <AnimatePresence>
                    {filtered.map(recipe => (
                        <motion.div
                            key={recipe.id}
                            className="region-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={recipe.image}
                                alt={`${recipe.title} — ${recipe.cuisine} cuisine`}
                                loading="lazy"
                                width="400"
                                height="260"
                                srcSet={`${recipe.image}&w=320 320w, ${recipe.image}&w=480 480w, ${recipe.image}&w=640 640w`}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            <div className="info">
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}


