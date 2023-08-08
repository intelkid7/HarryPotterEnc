import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import axios from 'axios';
import { useAuth } from '../../contexts/auth';
import { toast } from 'react-hot-toast';
import Spinner from './Spinner';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';

export default function Species() {

    const [species, setSpecies] = useState([]);
    const [page, setPage] = useState(1);
    const pagesize = 4;

    const [loading, setLoading] = useState(true);

    const { auth } = useAuth();

    const getSpells = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getSpecies?page=${page}&pagesize=${pagesize}`);
            console.log(res.data);
            setSpecies(res.data.species);
            setLoading(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setLoading(true);
        getSpells();
    }, [page]);

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
            toast.error(error.response.data.message);
        }
    }

    return (
        <div id="speicesdiv">
            <Navbar />
            <div className="text-light">
                <h1 className='py-5 mb-5 title text-center' id='shead'>Speices</h1>
                {/* Display books in form of cards */}
                <div className="row" style={{ padding: "5% 12%" }}>
                    {loading ? <Spinner /> : species?.map((sp) => (
                        <Link to={`/species/${sp._id}`} style={{ textDecoration: "none" }} className='col-md-6 mb-5'>
                            <div key={sp._id} class="container mb-1">
                                <div class="thecard d-flex align-items-center justify-content-center mb-5">
                                    <div class="thefront skeleton d-flex align-items-center justify-content-center object-fit-scale">
                                        <img id='spcscrd' className='img-front' src={sp.image_url} height={432} width={274} />
                                    </div>
                                    <div class="theback">
                                        <img id='spcscrd' src={sp.image_url2} height={432} width={274} />
                                    </div>
                                </div>
                                <div className='d-flex flex-row align-items-center justify-content-center'>
                                    <Link className="ch-btn" onClick={() => handleFavorite(sp._id)}>Add to  <StarIcon /></Link>
                                    <Link className="ch-btn ms-5" to={`/species/${sp._id}`}>View Details</Link>
                                </div>
                            </div>
                        </Link>
                    )
                    )}
                </div>
            </div>

            {/* Pagination */}
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
                            disabled={species.length < pagesize ? true : false}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
