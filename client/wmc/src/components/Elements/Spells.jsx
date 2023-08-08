import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../contexts/auth';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default function Spells() {

    const [spells, setSpells] = useState([]);

    const { auth } = useAuth();

    const getSpells = async () => {

        try {

            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells`);
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
        <div>
            <Navbar />
            <div className="text-light d-flex align-items-center justify-content-center flex-column">
                <h1 className='mb-5 title py-5'>Spells</h1>
                <div className='row w-75'>
                    {spells.map((sp) => (
                        <Link to={`/spells/${sp._id}`} className="col-md-6 text-decoration-none" >
                            <div className="container d-flex justify-content-center my-4 mb-5">
                                <div id="mobile-box">
                                    <div className="card">
                                        <div className="bg-image hover-overlay ripple card-img-div" data-mdb-ripple-color="light">
                                            <img className="card-img-top" src={sp.image_url} alt="Card image cap" />
                                        </div>
                                        <div className="card-body text-center">
                                            <h5 className="h5 font-weight-bold">{sp.name}</h5>
                                            <p className="mb-0">Category : {sp.category}</p>
                                            <audio id="music" preload="true">
                                                <source src={`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/spells/${sp._id}/audio`} />
                                            </audio>
                                            <div id="audioplayer" className='d-flex align-items-center justify-content-center'>
                                                <PlayArrowIcon larg/>
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
        </div>
    )
}
