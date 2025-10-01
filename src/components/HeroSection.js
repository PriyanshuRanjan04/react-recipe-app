import CustomImage from "./CustomImage"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecipes } from "../context/RecipeContext"

export default function HeroSection() {
    const [query, setQuery] = useState("")
    const navigate = useNavigate()
    const { filterRecipes } = useRecipes()
    const images = [
        // Indian (≈70%)
        "https://images.unsplash.com/photo-1604908176997-43162cea1735?q=80&w=1200&auto=format&fit=crop", // biryani
        "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=1200&auto=format&fit=crop", // dosa
        "https://images.unsplash.com/photo-1625944529203-4a3b29b3c0dc?q=80&w=1200&auto=format&fit=crop", // thali
        "https://images.unsplash.com/photo-1601050690114-b3f4c0b1e4b5?q=80&w=1200&auto=format&fit=crop", // butter chicken
        "https://images.unsplash.com/photo-1645112400698-5a2ab0e86259?q=80&w=1200&auto=format&fit=crop", // pani puri
        "https://images.unsplash.com/photo-1628294895950-53b5a1e74a53?q=80&w=1200&auto=format&fit=crop", // samosa
        "https://images.unsplash.com/photo-1617692855027-5f96e65e6a85?q=80&w=1200&auto=format&fit=crop", // paneer tikka
        // Global (≈30%)
        "https://images.unsplash.com/photo-1548365328-9f547fb095de?q=80&w=1200&auto=format&fit=crop", // sushi
        "https://images.unsplash.com/photo-1546549039-49ec0d6f52b8?q=80&w=1200&auto=format&fit=crop", // pizza
        "https://images.unsplash.com/photo-1542444459-db63c49ef64b?q=80&w=1200&auto=format&fit=crop"  // pasta
    ]
    return (
        <div className="section hero bg-hero-saffron">
            <div className="col typography">
                <h1 className="title">What Are We About</h1>
                <p className="info">Dishcovery is a place where you can please your soul and tummy with delicious food recipes of all cuisines. And our service is absolutely free. So start exploring now.</p>
                <form
                    className="hero-search"
                    onSubmit={(e) => {
                        e.preventDefault()
                        const prev = JSON.parse(localStorage.getItem('recentSearches') || '[]')
                        const next = [query, ...prev.filter(q => q !== query)].slice(0, 8)
                        localStorage.setItem('recentSearches', JSON.stringify(next))
                        filterRecipes({ search: query, cuisine: '', difficulty: '', cookingTime: '', tags: [] })
                        navigate('/recipes')
                    }}
                >
                    <input
                        type="search"
                        placeholder="Search Indian & global recipes..."
                        aria-label="Search recipes"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="btn" type="submit">Search</button>
                </form>
            </div>
            <div className="col gallery">
                {images.map((src, index) => (
                    <CustomImage key={index} imgSrc={src} pt={"90%"} />
                ))}
            </div>
        </div>
    )
}