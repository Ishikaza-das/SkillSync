import React from 'react'
import Navbar from '../shared/Navbar';
import Headsection from './components/Headsection';
import CategoryCarousel from './components/CategoryCarousel';

const Home = () => {
  return (
    <div>
      <Navbar/>
      <Headsection/>
      <CategoryCarousel/>
      {/* <LatestJobs/> */}
      {/* <Footer/> */}
    </div>
  )
}

export default Home;
