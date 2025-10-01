import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecipes } from "../context/RecipeContext"

export default function MobileSearchBar() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const { filterRecipes } = useRecipes()

    function onSubmit(e) {
        e.preventDefault()
        filterRecipes({ search: query, cuisine: '', difficulty: '', cookingTime: '', tags: [] })
        navigate('/recipes')
    }

    return (
        <form className="mobile-search" onSubmit={onSubmit} role="search" aria-label="Mobile recipe search">
            <input
                type="search"
                placeholder="Search recipes..."
                aria-label="Search recipes"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn" type="submit">Search</button>
        </form>
    )
}



