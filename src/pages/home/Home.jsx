import React from 'react'
import Categories from '../../components/categories/Categories'
import FeaturedBlogs from '../../components/featuredBlogs/FeaturedBlogs'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import Newsletter from '../../components/newsletter/Newsletter'
import classes from './home.module.css'
import Recent from '../../components/Recent/Recent'
import Search from '../../components/search/Search'

const Home = () => {
  return (
    <div>
      <Navbar />
      <Search/>
      <FeaturedBlogs />
      
      <Categories />
      <Recent/>
      <Newsletter />
      <Footer />
    </div>
  )
}

export default Home