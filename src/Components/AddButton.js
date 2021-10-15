import React from 'react';
import { trends } from '../Services/trends';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function AddButton({ id, trendsDisplayMode, deletedBindingFunc, BlockShowingModalBindingFunc }) {

    const handleClick = async () => {
        BlockShowingModalBindingFunc()
        if(trendsDisplayMode === 'all' ) {
            const addedToFavorites = await trends.addToFavorites(id)
            if(addedToFavorites)
                window.alert('Trend added successfully!')
        } else {
            const response = await trends.deleteFavorites(id)
            if(response){
                deletedBindingFunc(true);
                window.alert('Trend deleted successfully!');
            }
        }
    }

    
    const deleteBtnStyle = trendsDisplayMode === 'favorites' ? 'red' : 'black' 
    const tooltipText = trendsDisplayMode === 'favorites' 
                        ? 'Delete trend from favorites' 
                        : 'Add trend to my collection' 

    return (
        <div className="add">
            <OverlayTrigger
                key="top"
                placement="top"
                overlay={
                    <Tooltip id="tooltip-top">
                        {tooltipText}
                    </Tooltip>
                }
            >
                <button className="add__btn" onClick={handleClick}>
                    <span 
                        style={{ writingMode: 'vertical-rl', 
                        padding: '5px 0px 0px 2px', color:`${deleteBtnStyle}`}}>...
                    </span>
                </button>
            </OverlayTrigger>
        </div>
    )
}
