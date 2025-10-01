import React from "react"
import { motion } from "framer-motion"

const testimonials = [
    {
        name: "Aarav Singh",
        cuisine: "Indian",
        avatar: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=160&auto=format&fit=crop",
        text: "Dishcovery celebrates the diversity of Indian cuisine with authenticity and heart.",
    },
    {
        name: "Lakshmi Rao",
        cuisine: "South Indian",
        avatar: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=160&auto=format&fit=crop",
        text: "Love the focus on regional flavors — from dosa to idli and beyond!",
    },
    {
        name: "Harpreet Kaur",
        cuisine: "Punjabi",
        avatar: "https://images.unsplash.com/photo-1548946526-f69e2424cf45?q=80&w=160&auto=format&fit=crop",
        text: "Rustic, rich, and comforting recipes presented beautifully.",
    },
]

export default function Testimonials() {
    return (
        <div className="section d-block bg-quote-chili">
            <h1 className="title">What Chefs Say</h1>
            <div className="region-grid">
                {testimonials.map((t) => (
                    <motion.div
                        key={t.name}
                        className="region-card"
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.25 }}
                    >
                        <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
                            <img
                                src={t.avatar}
                                alt={`${t.name}, ${t.cuisine} chef`}
                                loading="lazy"
                                width="48"
                                height="48"
                                style={{ borderRadius: '999px' }}
                                srcSet={`${t.avatar}&w=48 48w, ${t.avatar}&w=64 64w, ${t.avatar}&w=96 96w`}
                                sizes="48px"
                            />
                            <div>
                                <strong>{t.name}</strong>
                                <div style={{ color: 'var(--text-light)' }}>{t.cuisine} Chef</div>
                            </div>
                        </div>
                        <p style={{ marginTop: '.5rem' }}>{t.text}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}



