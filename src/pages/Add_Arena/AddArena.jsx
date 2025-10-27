import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import StadiumHeader from './components/StaduimHeader'
import StadiumImage from './components/StaduimImages'
import StadiumInfo from './components/StaduimInfo'
import StadiumMap from './components/StaduimMap'
import StaduimReviews from './components/StaduimReviews'

const AddArena = () => {
  return (
    <>
    <Navbar/>
   <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4">
        <StadiumImage />
        <StadiumHeader />
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            
            <StadiumInfo />
          
          </div>
          <div className="space-y-4">
            <StadiumMap />
          </div>
            
        </div>
        <StaduimReviews/>
      </div>
    </div>
   
    
    <Footer/>
    </>
  )
}

export default AddArena