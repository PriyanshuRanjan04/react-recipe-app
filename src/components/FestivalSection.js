import React, { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const FESTIVAL_RECIPES = [
    {
        id: 'f1',
        name: 'Diwali Laddoo',
        image: 'https://images.unsplash.com/photo-1601050690114-b3f4c0b1e4b5?q=80&w=1200&auto=format&fit=crop',
        description: 'Melt-in-mouth besan laddoos for the festival of lights.',
        region: 'North India',
        difficulty: 'Easy',
        tags: ['Diwali', 'Sweets'],
        banner: '🪔',
    },
    {
        id: 'f2',
        name: 'Holi Gujiya',
        image: 'https://images.unsplash.com/photo-1625944529203-4a3b29b3c0dc?q=80&w=1200&auto=format&fit=crop',
        description: 'Crispy gujiyas filled with khoya and nuts for Holi.',
        region: 'North India',
        difficulty: 'Medium',
        tags: ['Holi', 'Snacks'],
        banner: '🎨',
    },
    {
        id: 'f3',
        name: 'Monsoon Masala Chai',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1200&auto=format&fit=crop',
        description: 'Spiced tea with ginger and cardamom for rainy evenings.',
        region: 'Pan India',
        difficulty: 'Easy',
        tags: ['Monsoon', 'Beverages'],
        banner: '🌧️',
    },
    {
        id: 'f4',
        name: 'Winter Gajar Ka Halwa',
        image: 'https://images.unsplash.com/photo-1617195737496-5b18e4036425?q=80&w=1200&auto=format&fit=crop',
        description: 'Carrot halwa slow-cooked with ghee and nuts for winter warmth.',
        region: 'North India',
        difficulty: 'Medium',
        tags: ['Winter', 'Desserts'],
        banner: '❄️',
    },
    {
        id: 'f5',
        name: 'Ganesh Chaturthi Modak',
        image: 'https://images.unsplash.com/photo-1634551942841-9c0d1c59d2aa?q=80&w=1200&auto=format&fit=crop',
        description: 'Steamed ukadiche modak with coconut-jaggery filling.',
        region: 'Maharashtra',
        difficulty: 'Hard',
        tags: ['Ganesh Chaturthi', 'Sweets'],
        banner: '🐘',
    },
    {
        id: 'f6',
        name: 'Onam Sadhya (Avial)',
        image: 'https://images.unsplash.com/photo-1604908176997-43162cea1735?q=80&w=1200&auto=format&fit=crop',
        description: 'Traditional Kerala mixed vegetable curry with coconut.',
        region: 'Kerala',
        difficulty: 'Medium',
        tags: ['Onam', 'Festive Meal'],
        banner: '🌼',
    },
]

function getCurrentFestivalTags(date = new Date()) {
    const month = date.getMonth() + 1
    if (month === 10 || month === 11) return ['Diwali']
    if (month === 3) return ['Holi']
    if (month >= 6 && month <= 9) return ['Monsoon']
    if (month === 8 || month === 9) return ['Ganesh Chaturthi']
    if (month === 9) return ['Onam']
    if (month === 12 || month <= 2) return ['Winter']
    return []
}

export default function FestivalSection() {
    const [activeTag, setActiveTag] = useState('All')
    const activeSuggestions = useMemo(() => getCurrentFestivalTags(), [])
    const tags = useMemo(() => ['All', ...Array.from(new Set(FESTIVAL_RECIPES.flatMap(r => r.tags)))], [])

    const filtered = useMemo(() => {
        const list = activeTag === 'All' ? FESTIVAL_RECIPES : FESTIVAL_RECIPES.filter(r => r.tags.includes(activeTag))
        // Boost current suggestions to the front
        const boosted = [...list].sort((a, b) => {
            const ai = a.tags.some(t => activeSuggestions.includes(t)) ? -1 : 0
            const bi = b.tags.some(t => activeSuggestions.includes(t)) ? -1 : 0
            return ai - bi
        })
        return boosted
    }, [activeTag, activeSuggestions])

    return (
        <section className="section d-block bg-region-saffron-grid" aria-label="Seasonal and Festival Recipes">
            <div className="title" style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <span role="img" aria-label="festival">🎉</span>
                Seasonal & Festival Recipes
            </div>
            <p className="info" aria-live="polite">Discover festive dishes for Diwali, Holi, the Monsoon, winter and more.</p>

            <div className="tabs" role="tablist" aria-label="Festival and season filters">
                {tags.map(tag => (
                    <button
                        key={tag}
                        role="tab"
                        aria-selected={activeTag === tag}
                        className={`tab ${activeTag === tag ? 'active' : ''}`}
                        onClick={() => setActiveTag(tag)}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            <div className="region-grid" aria-live="polite">
                <AnimatePresence>
                    {filtered.map(card => (
                        <motion.article
                            key={card.id}
                            className="region-card"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.25 }}
                            aria-label={`${card.name}, ${card.region} ${card.difficulty}`}
                        >
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'absolute', top: 8, left: 8, fontSize: '1.25rem' }} aria-hidden="true">{card.banner}</div>
                                <img
                                    src={card.image}
                                    alt={`${card.name} — ${card.region}`}
                                    loading="lazy"
                                    width="400"
                                    height="260"
                                    srcSet={`${card.image}&w=320 320w, ${card.image}&w=480 480w, ${card.image}&w=640 640w`}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="info">
                                <h3>{card.name}</h3>
                                <p>{card.description}</p>
                                <div style={{ display: 'flex', gap: '.5rem', color: 'var(--text-light)' }}>
                                    <span>{card.region}</span>
                                    <span>•</span>
                                    <span>{card.difficulty}</span>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </div>
        </section>
    )
}



