import HeroSection from "../components/HeroSection";
import ImproveSkills from "../components/ImproveSkills";
import QouteSection from "../components/QuoteSection";
import ChiefsSection from "../components/ChiefsSection";
import RecipeOfTheDay from "../components/RecipeOfTheDay";
import DiscoverByRegion from "../components/DiscoverByRegion";
import Testimonials from "../components/Testimonials";
import { useEffect, useState } from "react";
import { useRecipes } from "../context/RecipeContext";


export default function Home() {
    const { recipes } = useRecipes()
    const [recent, setRecent] = useState([])
    useEffect(() => {
        const r = JSON.parse(localStorage.getItem('recentSearches') || '[]')
        setRecent(r.slice(0, 5))
    }, [])
    return (
        <div>
            <RecipeOfTheDay />
            <HeroSection />
            {recent.length > 0 && (
                <div className="section d-block">
                    <h2 className="title">Recent searches</h2>
                    <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                        {recent.map((q, i) => <span key={i} className="tab">{q}</span>)}
                    </div>
                </div>
            )}
            <ImproveSkills />
            <QouteSection />
            <ChiefsSection />
            <DiscoverByRegion />
            <Testimonials />
        </div>
    )
}