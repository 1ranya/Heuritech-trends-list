import React from 'react'

export default function Navbar() {
    return (
        <div className="navbar">
            <div className="logo-side">
                Trend List
            </div> 
            <div className="filter-side">
                Show: &nbsp;
                <button className="button-btn-all"> All </button>
                <button className="button-btn-fav"> Favorites </button>
                &nbsp; Filters:
                <select>
                    <option>one</option>
                </select>
                <select>
                    <option>one</option>
                </select>
                <select>
                    <option>one</option>
                </select>
            </div>
        </div>
    )
}
