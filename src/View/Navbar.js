import React, { useEffect, useState } from 'react';
import { trends } from '../Services/trends';
import  { capitalizeFirstChar } from '../utils.js';

export default function Navbar({setSortBindingFunc, setModeBindingFunc, setGenderBindingFunc, setZoneBindingFunc}) {
    const [zones, setZone] = useState(['Europe'])
    const [fieldsToSortWith, setFieldsToSortWith] = useState(['Name'])

    useEffect( () => {
        (async() => {
            const fieldsFromApi = await trends.getFieldsSort()
            const capitalizedFields = fieldsFromApi.map(field => {
                return field
            })
            setFieldsToSortWith(capitalizedFields)
            changeZoneGeo()
        })()
    }, [])

    // Get unique geoZones 
    const changeZoneGeo = async () => {
        let trendZone = [];
        const trendsFromApi = await trends.getTrends()
        trendsFromApi.trends.map(trend => {
            let geoZone = trend.geozone
            if (!trendZone.includes(geoZone)) {
                trendZone.push(geoZone);
            }
            return null;
        })
        setZone(trendZone)
    }

    const renameGeoZone = (zone) => {
        switch(zone) {
            case 'eu': 
                return 'Europe'; 
            case 'cn': 
                return 'Canada'; 
            case 'br': 
                return 'Bretagne'; 
            case 'jp': 
                return 'Japon'; 
            case 'us': 
                return 'United States'; 
            default:
                return '';
        }
    }

    const zonesList = zones.map((zone, index) => {
        return <option key={index} value={zone}> { renameGeoZone(zone) } </option>
    })

    const sortList = fieldsToSortWith.map((field, index) => {
        return <option key={index} value={field}> Sort By { capitalizeFirstChar(field) } </option>
    })

    const handleClick = (e) => {

        /** Change button state  */
        let element =  document.getElementById(e.target.id); 
        let otherElements = document.querySelector(".active");
        otherElements.classList.remove("active");
        element.className += 'active';

        /** display data */
        const value = e.target.value
        setModeBindingFunc(value);
        localStorage.setItem('mode', value)
    }

    const onChangeSort = async(e) => {
        const value = e.target.value;
        setSortBindingFunc(value)
        localStorage.setItem('sort', value)
    }
 
    const handleGender = (e) => {
        const value = e.target.value
        setGenderBindingFunc(value);
        localStorage.setItem('gender', value)
    }

    const handleZone = (e) => {
        const value = e.target.value
        setZoneBindingFunc(value);
        localStorage.setItem('zone', value)
    }

    return (
        <div className="navbar">
            <div className="logo-side">
                Trend List
            </div> 
            <div className="filter-side">
                Show: 
                <button id="button-btn-all" 
                        className="active" 
                        value="all" 
                        onClick={handleClick}> All </button>
                <button id="button-btn-fav" 
                        value="favorites" 
                        onClick={handleClick}> Favorites </button>
                Filters:
                <select value={localStorage.getItem('sort') ?? 'name'} 
                        className="sortBySelect" 
                        onChange = {onChangeSort}>
                    { sortList }
                </select>
                <select value={localStorage.getItem('gender') ?? 'female'} 
                        onChange = {handleGender}>
                    <option value='female'>Female</option>
                    <option value='male'> Male</option>
                </select>
                <select value={localStorage.getItem('zone') ?? 'eu'} 
                        onChange = {handleZone}>
                    { zonesList }
                </select>
            </div>
        </div>
    )
}
