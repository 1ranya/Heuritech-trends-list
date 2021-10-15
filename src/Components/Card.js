import React, { useState, useEffect } from 'react'
import AddButton from './AddButton'
import Modal from 'react-bootstrap/Modal'
import { trends } from '../Services/trends'

export default function Card({ 
    name, growth, id, image,
    trendsDisplayMode, 
    setDeleteBindingFunc, }) {
        
    const [show, setShow] = useState(false);
    const [images, setImages] = useState([])
    const [blockModal, setBlockModal] = useState(false)

    let style = `https://images.heuritech.com/${image}`;

    useEffect(() => {
        (async () => {
            const images = await trends.getImages(id)
            setImages(images.images)
        })()
    }, [id]) 

    const convertToPercentage = (growth) => {
        return Math.round(growth * 100)
    }

    const deletedBindingFunc = () => {
        setDeleteBindingFunc(true)
    }

    const BlockShowingModalBindingFunc = () => {
        setBlockModal(true)
    }

    const moodboard = Object.keys(images).map((key, index) => {
        return  <div className="moodboard-item">
                    <img 
                        className='moodboard-img' 
                        key={index} 
                        src={`https://images.heuritech.com/${images[key]}`}
                        alt="moodboard" 
                        >
                    </img>
                </div>
    })

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div 
                className='card'
                style={{backgroundImage: `linear-gradient(to bottom, rgb(255, 255, 255, 0.1), rgba(43, 43, 43, 0.9)), url(${style})`}}
                onClick={handleShow}
                >
                <AddButton 
                    id={id} 
                    trendsDisplayMode={trendsDisplayMode} 
                    deletedBindingFunc={deletedBindingFunc}
                    BlockShowingModalBindingFunc={BlockShowingModalBindingFunc}
                />
                <div className="card-description">
                    <div className="card-description__right">
                        { name }
                    </div>
                    <div className="card-description__left">
                        <p className="description">Growth of Fall 2020</p>
                        <p className="growth">{ convertToPercentage(growth) } % </p>
                    </div>
                </div>
            </div>
            {show && !blockModal &&
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {moodboard}
                    </Modal.Body>
                </Modal>
            }
        </>
    )
}
