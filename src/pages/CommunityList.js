import React from 'react'
import { useQuery } from '@tanstack/react-query'

export default function CommunityList() {
    const q = useQuery({
        queryKey: ['community'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:4000'}/api/community`)
            if (!res.ok) throw new Error('Failed to load')
            return res.json()
        }
    })
    return (
        <div className="section d-block">
            <h1 className="title">Community Recipes</h1>
            {q.isLoading && <div>Loading...</div>}
            {q.data && (
                <div className="recipes-container">
                    {q.data.items.map((r) => (
                        <article key={r._id} className="region-card">
                            {r.image && <img src={r.image} alt={r.title} loading="lazy" width="400" height="260" />}
                            <div className="info">
                                <h3>{r.title}</h3>
                                {r.description && <p>{r.description}</p>}
                                {r.region && <span>{r.region}</span>}
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    )
}


