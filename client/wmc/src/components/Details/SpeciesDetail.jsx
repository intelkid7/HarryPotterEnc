import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';

export default function SpeciesDetail() {

    const [species, setSpecies] = useState({});
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    const { id } = useParams();

    const getSpecies = async () => {

        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getSpecies/${id}`);
            console.log(res.data);
            setSpecies(res.data.species);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSpecies();
        getComments();
    }, [])

    const handleComment = (id) => async (e) => {

        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/addComment/${id}`, {
                comment
            });

            console.log(res.data);
            getComments();

        }
        catch (err) {
            console.log(err);
        }
    }

    const getComments = async () => {

        try {
            const { data } = await axios.get(`${import.meta.env.VITE_REACT_API_APP_PORT}/api/v1/users/getComment/${id}`);

            console.log(data);
            console.log(data.data.character)
            // for(let i=0;i<res.data.character.length;i++){
            //     setComments(prev => {
            //         return [...prev, res.data.character[i]];
            //     })
            // }
            setComments(data.data.character);

        }
        catch (err) {
            console.log(err);
        }

    }


    return (
        <div>
            <Navbar />
            <div className='d-flex align-items-center justify-content-center'>
                <div className="col-md-10 text-light">
                    <h1 className='my-5 title text-center'>Speices Detail</h1>
                    {/* Display books in form of cards */}
                    <div className="row py-5 d-flex justify-content-center">
                        <div class="col-md-4 thefront skeleton d-flex align-items-center justify-content-center object-fit-scale">
                            <img className='img-front' src={species.image_url} height={432} width={274} />
                        </div>
                        <div className="col-md-8" style={{ padding: "0% 5%" }}>
                            <h1 className='mb-2'>{species?.name}</h1>
                            <p className='mb-2'>{species?.description}</p>
                            <hr />
                            <p className='mb-2'>Classification : {species?.classification}</p>
                            <p className='mb-2'>Habitat : {species?.habitat}</p>
                            <p className='mb-2'>Average Height : {species?.averageHeight}</p>
                            <p className='mb-2'>Average Life Spane : {species?.averageLifespan}</p>
                        </div>
                    </div>
                    <div className='p-4'>
                        <h1 className='mb-4'>Comments</h1>
                        <form onSubmit={handleComment(species?._id)}>
                            <div className="form-floating">
                                <textarea className="form-control" placeholder="Leave a comment here" id="floatingTextarea" value={comment} onChange={(e) => setComment(e.target.value)} defaultValue={""} style={{ height: "100px" }} />
                                <label htmlFor="floatingTextarea">Comments</label>
                            </div>
                            <button className='btn btn-primary mt-3'>Add Comment</button>
                        </form>
                    </div>
                    <div className='p-4 text-light'>

                        {/* {comments?.length > 0 ? (<h1>Hello Brother {comment[0]} is here</h1>) : (<h1>No comments Brother</h1>)} */}

                        {comments?.map((c) =>
                        (
                            <>
                                <h3>{c?.user?.name} <span className='fs-5'>{
                                    moment(c?.createdAt).fromNow()
                                }</span></h3>
                                <p>{c?.comment}</p>
                            </>
                        )
                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}
