import React from 'react'
import { Link } from 'react-router-dom'

export default function Start() {

  return (
    <div>
        <video id='ci' src="/castleintro2.mp4" autoPlay></video>
        <div className='position-relative vh-100 d-flex align-items-center justify-content-center fs-2'>
            <Link id='startbtn' className='me-5 text-decoration-none'>Login</Link>
            <Link id='startbtn' className='text-decoration-none'>Register</Link>
        </div>
    </div>
  )
}
