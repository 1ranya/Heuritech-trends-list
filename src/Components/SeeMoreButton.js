import React, { useState } from 'react'

export default function SeeMoreButton({loadMoreBindingFunc}) {
    let [loadMore, setLoadMore] = useState(20)
    let [hideSeeMore, setHideSeeMore] = useState(false)

    const handleClick = () => {
        setLoadMore(loadMore+=20)
        if(loadMore < 20)
            setHideSeeMore(loadMore)
        loadMoreBindingFunc(loadMore, hideSeeMore)
    }

    return (
        <div className="seeMore">
            <div className="seeMore__line">
            </div>
            <div className="seeMore__btn">
                <button className="btn-seeMore" onClick={handleClick}>
                    See more trends 
                </button>
            </div>
        </div>
    )
}
