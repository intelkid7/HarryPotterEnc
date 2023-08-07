import React from 'react'
import { Link } from 'react-router-dom'

export default function Start() {



  return (
    <div>
      <video id='ci' src="/castleintro2.mp4" autoPlay></video>
      <img id='hgl' src="/HogwartsLlogo.png" alt="" />
      <div className='position-relative vh-100 d-flex align-items-center justify-content-center fs-2' id="logdiv">
        <Link to="/register" id='register' className='text-decoration-none text-wrap'>Register</Link>
        <Link to="/login" id='login' className='text-decoration-none text-wrap'>Login</Link>
      </div>
    </div>
  )
}
