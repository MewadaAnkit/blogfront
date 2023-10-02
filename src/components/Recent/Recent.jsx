

import React, { useState, useEffect } from 'react';
import classes from './recent.module.css';
import { MdOutlinePreview } from 'react-icons/md';
import { AiFillLike } from 'react-icons/ai';
import { Link } from 'react-router-dom'

const Recent = () => {
  const [featuredBlogs, setFeaturedBlogs] = useState([]);

  useEffect(() => {
    // Fetch featured blogs from your backend endpoint
    fetch('http://localhost:5000/blog/recent')
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
        <h3>Recent Posts</h3>
        <div className={classes.blogs}>
        <div className={classes.left}>
            {featuredBlogs.map((blog) => (
              <div key={blog._id} className={classes.mainBlog}>
                <Link to={`/blogDetails/${blog?._id}`}>                
                <img src={`http://localhost:5000/images/${blog?.photo}`} alt={blog.title} />
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

export default Recent;
