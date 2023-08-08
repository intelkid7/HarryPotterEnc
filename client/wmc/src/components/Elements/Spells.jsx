import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { handleAudio } from './audio';

export default function Spells() {

    const [spells, setSpells] = useState([]);
    const [page, setPage] = useState(1);
    const pagesize = 4;


    const { auth } = useAuth();

    const getSpells = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells?page=${page}&pagesize=${pagesize}`);
            console.log(res.data);
            setSpells(res.data.spells);


        } catch (error) {
            console.log(error)
        }
    }

    const handleFavorite = async (id) => {
        try {
            if (auth) {
                const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/addFavorite/${id}`);
                if (res.data.success === true) {
                    toast.success("Added to Favorite!");
                }

                if (res.data.success === false) {
                    toast.error("Already in Favorite!");
                }
            }
            else {
                toast.error("Please login first!");
            }
        }
        catch (error) {
            console.log(error);
            toast.error("Please login first!");
        }
    }

    useEffect(() => {
        getSpells();
    }, [])

    return (
        <div id="spelldiv">
            <Navbar />
            <div className="text-light d-flex align-items-center justify-content-center flex-column">
                <h1 id='spellhead' className='mb-5 title py-5'>Spells</h1>
                <div className='row w-75'>
                    {spells.map((sp) => (
                        <Link to={`spells/${sp/_id}`} className="col-md-6 text-decoration-none" >

                            <div id="spellcard" className="container d-flex justify-content-center my-4 mb-5">
                                <div id="mobile-box">
                                    <div className="card">
                                        <div className="bg-image hover-overlay ripple card-img-div" data-mdb-ripple-color="light">
                                            <img className="card-img-top" src={sp.image_url} alt="Card image cap" />
                                            <Link to={`/spells/${sp._id}`}>
<div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}} />
                                            </Link>
                                        </div>
                                        <div id='spellcard2' className="card-body text-center">
                                            <h5 className="h5 fs-6 font-weight-bold">{sp.name}</h5>
                                            <p className="mb-0">Category : {sp.category}</p>
                                            <audio id={`${sp._id}`} preload="true">
                                                <source src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells/${sp._id}/audio`} />
                                            </audio>
                                            <div id="audioplayer" className='d-flex align-items-center justify-content-center'>
                                                <Link onClick={() => handleAudio(sp._id)}><PlayArrowIcon /></Link>
                                                <div id="timeline" className='mb-3'>
                                                    <div id="playhead" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    ))}
                </div>
            </div>

            <div className='d-flex align-items-center justify-content-center fs-3'>
                <ul className="pagination justify-content-center">
                    <li className="page-item">
                        <button id='pnav' className="page-link" href="#" onClick={() => setPage(page - 1)} aria-label="Previous"
                            disabled={page === 1 ? true : false}
                        >
                            <span aria-hidden="true"> &laquo;</span>
                        </button>
                    </li>
                    <li className="page-item"><a id='pnav' className="page-link" href="#" onClick={() => setPage(1)}>1</a></li>
                    <li className="page-item"><a id='pnav' className="page-link" href="#" onClick={() => setPage(2)}>2</a></li>
                    <li className="page-item"><a id='pnav' className="page-link" href="#" onClick={() => setPage(3)}>3</a></li>
                    <li className="page-item">
                        <button id='pnav' className="page-link" href="#" onClick={() => setPage(page + 1)} aria-label="Next"
                            disabled={spells.length < pagesize ? true : false}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
