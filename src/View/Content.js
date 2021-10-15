import React, { useEffect, useState} from 'react';
import Card from '../Components/Card';
import SeeMoreButton from '../Components/SeeMoreButton';
import { trends } from '../Services/trends';

export default function Content({ sortValue="name", trendsDisplayMode, gender='female', geoZone='eu'}) {
    const [trendsData, setTrendsData] = useState([]);
    const [loadMore, setLoadMore] = useState(20);
    const [trendsTotal, setTrendsTotal] = useState(0);
    let [deleted, setDelete] = useState(false)
    let [disable, setDisable] = useState(false)

    // Display data according mode 
    useEffect(() => {
        (async() => {
            const localStorageValues = getLocalStorage();
            let mode = localStorage.getItem('mode') ?? 'all'

            if (mode === 'all'){
                const response = await trends.getTrendsByParms(
                                                                localStorageValues.genderStored, 
                                                                localStorageValues.sortStored, 
                                                                localStorageValues.geoZoneStored
                                                                );
                const trendsAll = response
                displayByMode(trendsAll);
            } else {
                const getFavorites = await trends.getFavorites(
                                                                localStorageValues.genderStored, 
                                                                localStorageValues.sortStored, 
                                                                localStorageValues.geoZoneStored
                                                                );
                const trendsFavorites = getFavorites
                displayByMode(trendsFavorites);
            } 
        })()
    }, [trendsDisplayMode, gender, sortValue, geoZone])

    // Click on see more trends button 
    useEffect(() => {
        (async () => {
            const localStorageValues = getLocalStorage();
            if(loadMore>20){
                const loadedData = await trends.getLoadedMoreData(
                                                                    localStorageValues.genderStored, 
                                                                    localStorageValues.sortStored, 
                                                                    localStorageValues.geoZoneStored, 
                                                                    loadMore
                                                                ); 
                setTrendsData(loadedData.trends)
                setTrendsTotal(loadedData.trends.length)
            }
        })()
    }, [loadMore, gender, sortValue, geoZone])

    // Rerender after trend delete
    useEffect(() => {
        (async () => {
            if(deleted){
                let genderStored = localStorage.getItem('gender') ? localStorage.getItem('gender') : gender
                let sortStored = localStorage.getItem('sort') ? localStorage.getItem('sort') : sortValue
                let geoZoneStored = localStorage.getItem('zone') ? localStorage.getItem('zone') : geoZone

                const getFavorites = await trends.getFavorites(genderStored, sortStored, geoZoneStored)
                setTrendsData(getFavorites)
            }
        })()
    }, [deleted, gender, sortValue, geoZone])
    
    const displayByMode = (trends, message) => {
            setTrendsData(trends);
            setTrendsTotal(trends.length);
    }

    const getLocalStorage = () => {
        let genderStored = localStorage.getItem('gender') ? localStorage.getItem('gender') : gender
        let sortStored = localStorage.getItem('sort') ? localStorage.getItem('sort') : sortValue
        let geoZoneStored = localStorage.getItem('zone') ? localStorage.getItem('zone') : geoZone

        return {genderStored, sortStored, geoZoneStored};
    }

    const setDeleteBindingFunc = () => {
        setDelete(true)
    }
    
    const setShowBindingFunc = (value) => {
        setDisable(value)
    }
    
    const loadMoreBindingFunc = (loadMore) => {
        setLoadMore(loadMore)
        localStorage.setItem('pageSize', loadMore)
    }
    
    const cardList = Object.keys(trendsData).map((key, index) => {
        return <Card 
            key={index} 
            id={trendsData[key].id} 
            name={trendsData[key].name} 
            growth={trendsData[key].growth} 
            image={trendsData[key].image}
            deleted={deleted}
            trendsDisplayMode={trendsDisplayMode}
            setDeleteBindingFunc={setDeleteBindingFunc}
            setShowBindingFunc={setShowBindingFunc}
        />
    })
    
    return (
        <div className={disable ? "content disabled" : "content"}>
            {trendsDisplayMode === 'all' && <div className="title">All Trends ({ trendsTotal })</div>}
            <div className="card-content">
                { cardList }
            </div>
            { trendsTotal >= 20 
            ? <SeeMoreButton loadMoreBindingFunc={loadMoreBindingFunc}/> 
            : ''}
        </div>
    )
}
