import React from 'react'
import { motion } from 'framer-motion'

const items = [
    { id: 'mint', label: '🌿', x: 10 },
    { id: 'chili', label: '🌶️', x: 40 },
    { id: 'turmeric', label: '🫙', x: 70 },
]

export default function SpiceParticles() {
    return (
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {items.map((it, i) => (
                <motion.div
                    key={it.id}
                    initial={{ y: 300, opacity: 0 }}
                    animate={{ y: [-30, -10, -40], opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 8 + i, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ position: 'absolute', left: `${it.x}%`, fontSize: '1.5rem' }}
                >
                    {it.label}
                </motion.div>
            ))}
        </div>
    )
}


