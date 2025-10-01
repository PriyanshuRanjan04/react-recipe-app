import React from 'react'

export default function SkeletonCard() {
    return (
        <div className="recipe-card" aria-hidden="true">
            <div className="custom-image skeleton-spice" style={{ paddingTop: '65%' }} />
            <div className="recipe-card-info">
                <div className="skeleton-line" style={{ width: '70%' }} />
                <div className="skeleton-line" style={{ width: '90%' }} />
                <div className="skeleton-line" style={{ width: '50%' }} />
            </div>
        </div>
    )
}


