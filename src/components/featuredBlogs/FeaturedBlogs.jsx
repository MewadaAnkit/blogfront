

import React, { useState, useEffect } from 'react';
import classes from './featuredBlogs.module.css';
import { MdOutlinePreview } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    // Fetch featured blogs from your backend endpoint
    fetch('https://backendforblog-vdq1.onrender.com/blog/featured')
      .then((response) => response.json())
      .then((data) => {

        setFeaturedBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Featured Mantras(Blogs)</h3>
        <div className={classes.blogs}>
        <div className={classes.left}>
            {featuredBlogs.map((blog) => (
              <div key={blog._id} className={classes.mainBlog}>
                <Link to={`/blogDetails/${blog?._id}`}>                
                <img src={`https://backendforblog-vdq1.onrender.com/images/${blog?.photo}`} alt={blog.title} />
                </Link> 
                <div className={classes.mainBlogData}>
                  <div className={classes.categoryAndMetadata}>
                    <span className={classes.category}>{blog.category}</span>
                    <div className={classes.metadata}>
                      <MdOutlinePreview /> {blog.views} views
                    </div>
                    <div className={classes.metadata}>
                      <AiFillLike /> {blog.likes.length} likes
                    </div>
                  </div>
              

              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;

/*
import React, { useState, useEffect } from 'react';
import classes from './featuredBlogs.module.css';
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { MdOutlinePreview } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const FeaturedBlogs = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Fetch featured blogs from your backend endpoint
    fetch('http://localhost:5000/blog/featured')
      .then((response) => response.json())
      .then((data) => {
        setFeaturedBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + featuredBlogs.length) % featuredBlogs.length);
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <h3>Featured Mantras(Blogs)</h3>
        <Carousel
          selectedItem={currentSlide}
          onChange={setCurrentSlide}
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={2000}
          className={classes.carousel}// Set your desired interval in milliseconds
        >
          <div className={classes.left}>
            {featuredBlogs.length > 0 && (
              <div className={classes.mainBlog}>
                <Link to={`/blogDetails/${featuredBlogs[currentSlide]?._id}`}>
                  <img
                    src={`http://localhost:5000/images/${featuredBlogs[currentSlide]?.photo}`}
                    alt={featuredBlogs[currentSlide]?.title}
                  />
                </Link>
                <div className={classes.mainBlogData}>
                  <div className={classes.categoryAndMetadata}>
                    <span className={classes.category}>{featuredBlogs[currentSlide]?.category}</span>
                    <div className={classes.metadata}>
                      <MdOutlinePreview /> {featuredBlogs[currentSlide]?.views} views
                    </div>
                    <div className={classes.metadata}>
                      <AiFillLike /> {featuredBlogs[currentSlide]?.likes.length} likes
                    </div>
                  </div>
                  <h4>{featuredBlogs[currentSlide]?.title}</h4>
                  <p className={classes.blogDesc}>{featuredBlogs[currentSlide]?.description}</p>
                  <div className={classes.authorAndCreatedAt}>
                    <span>
                      <span>Author:</span> {featuredBlogs[currentSlide]?.author}
                    </span>
                    <span>
                      <span>Created:</span> {featuredBlogs[currentSlide]?.createdAt}
                    </span>
                  </div>
                </div>
              </div>


            )}
          </div>
        </Carousel>

        {featuredBlogs.length > 1 && (
          <div className={classes.sliderButtons}>
            <button className={classes.sliderButton} onClick={prevSlide}>
              <MdOutlineNavigateBefore />
            </button>
            <button className={classes.sliderButton} onClick={nextSlide}>
              <MdOutlineNavigateNext />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedBlogs;*/
