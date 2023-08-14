import React from 'react'
import Navbar from './Navbar'
import { useAuth } from '../contexts/auth'

export default function Home() {

  const { auth } = useAuth();

  console.log(auth)

  return (
    <>
      <Navbar />
      <video src="/Library.mp4" autoPlay id='libvid'></video>
      <div className='maindiv'>
        <h1 id='head01'>Welcome to the Hogwarts Library</h1>
      </div>

      <div id="fdivp">
        <div id='fdivp2'>
          <div id='fdiv' className='row'>
            <div id='fdiv2' className='col-lg-6'>
              <h1 id='fdivhead' >Your own magical Library</h1>
              <p id='fpara'>Explore the wizarding world from your desk. Roam into the
                library of Hogwarts and dive deep into the wizaring world. Creatures, Wands,
                famous Witches and Wizards, Spells, Books and much more. Learn, practice and master
                your spells and try them out! Discuss with your friends on an online community, your
                wizarding journey is just a click away!</p>
            </div>
            <div className='col-lg-6'>
              <img id='spellbook' src="/Images/spellbook.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
