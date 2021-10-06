import React from 'react'

export default function Card() {
    return (
        <div className="card">
            <div className="card-description">
                <div className="card-description__right">
                    title
                </div>
                <div className="card-description__left">
                    <p>description</p>
                    <p className="percentage">25%</p>
                </div>
            </div>
        </div>
    )
}
