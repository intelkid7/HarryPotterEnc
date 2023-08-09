import React from 'react'
import Navbar from './Navbar'

export default function About() {
  return (
    <div id="adiv">
    <Navbar />
    <div id='aboutus' className='d-flex align-items-center justify-content-center flex-column'>
      <h1 id="abthead" className='py-5 mb-5'>About us</h1>
      {/* <video id='ci' src="/castleintro2.mp4" autoPlay></video> */}
      <div className="row w-75">
        <div class="container col-md-6 mb-1">
          <div class="thecard d-flex align-items-center justify-content-center mb-5">
            <div class="thefront skeleton d-flex align-items-center justify-content-center">
              <img className='img-front' src='/SankalpPic.png' height={432} width={274} />
            </div>
            <div class="theback">
              <img src='/SabkalpDesc.png' height={432} width={274} />
            </div>
          </div>
        </div>
        <div class="container col-md-6 mb-1">
          <div class="thecard d-flex align-items-center justify-content-center mb-5">
            <div class="thefront skeleton d-flex align-items-center justify-content-center">
              <img className='img-front' src='/PriyanshPic.png' height={432} width={274} />
            </div>
            <div class="theback">
              <img src='/PriyanshDesc.png' height={432} width={274} />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
