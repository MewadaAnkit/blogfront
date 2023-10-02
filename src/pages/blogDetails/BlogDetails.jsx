/*import React from 'react'
import { useState } from 'react'
import classes from './blogDetails.module.css'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { request } from '../../utils/fetchApi'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import { format } from 'timeago.js'
import { AiFillEdit, AiFillLike, AiFillDelete, AiOutlineArrowRight, AiOutlineLike } from 'react-icons/ai'

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const { id } = useParams()
  const { user, token } = useSelector((state) => state.auth)

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { 'Authorization': `Bearer ${token}` }
        const data = await request(`/blog/find/${id}`, 'GET', options)
        setBlogDetails(data)
        setIsLiked(data.likes.includes(user._id))
      } catch (error) {
        console.error(error)
      }
    }
    fetchBlogDetails()
  }, [id])

  // like
  const handleLikePost = async () => {
    try {
      const options = { "Authorization": `Bearer ${token}` }
      await request(`/blog/likeBlog/${id}`, "PUT", options)
      setIsLiked(prev => !prev)
    } catch (error) {
      console.error(error)
    }
  }

  // delete
  const handleDeleteBlog = async() => {
    try {
      const options = {"Authorization": `Bearer ${token}`}
      await request(`/blog/deleteBlog/${id}`, "DELETE", options)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Link to='/' className={classes.goBack}>
          Go Back <AiOutlineArrowRight />
        </Link>
        <div className={classes.wrapper}>
          <img src={`http://localhost:5000/images/${blogDetails?.photo}`} />
          <div className={classes.titleAndControls}>
            <h3 className={classes.title}>{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id ?
              <div className={classes.controls}>
                <Link to={`/updateBlog/${blogDetails?._id}`} className={classes.edit}>
                  <AiFillEdit />
                </Link>
                <div className={classes.delete}>
                  <AiFillDelete onClick={handleDeleteBlog}/>
                </div>
              </div>
              :
              <>
                {isLiked
                  ? <div className={classes.like}>
                    <AiFillLike onClick={handleLikePost} />
                  </div> 
                  :
                  <div className={classes.like}>
                    <AiOutlineLike onClick={handleLikePost} />
                  </div>
                }
              </>
            }
          </div>
          <div className={classes.descAndLikesViews}>
            <p className={classes.desc}>
              <span>Description: </span>
              {blogDetails?.desc}
            </p>
            <div className={classes.likesAndViews}>
              <span>{blogDetails?.views} views</span>
              <span>{blogDetails?.likes?.length} likes</span>
            </div>
          </div>
          <div className={classes.authorAndCreatedAt}>
            <span><span>Author:</span> {blogDetails?.userId?.username}</span>
            <span><span>Created At:</span> {format(blogDetails?.createdAt)}</span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default BlogDetails

//second code
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { request } from '../../utils/fetchApi';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { format } from 'timeago.js';
import {
  AiFillEdit,
  AiFillLike,
  AiFillDelete,
  AiOutlineArrowRight,
  AiOutlineLike,
} from 'react-icons/ai';
import classes from './blogDetails.module.css';

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const options = { Authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`, 'GET', options);
        setBlogDetails(data);
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleLikePost = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/likeBlog/${id}`, 'PUT', options);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const options = { Authorization: `Bearer ${token}` };
      await request(`/blog/deleteBlog/${id}`, 'DELETE', options);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Link to="/" className={classes.goBack}>
          Go Back <AiOutlineArrowRight />
        </Link>
        <div className={classes.wrapper}>
          <img src={`http://localhost:5000/images/${blogDetails?.photo}`} alt={blogDetails?.title} />
          <div className={classes.titleAndControls}>
            <h3 className={classes.title}>{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id ? (
              <div className={classes.controls}>
                <Link to={`/updateBlog/${blogDetails?._id}`} className={classes.edit}>
                  <AiFillEdit />
                </Link>
                <div className={classes.delete}>
                  <AiFillDelete onClick={handleDeleteBlog} />
                </div>
              </div>
            ) : (
              <>
                {isLiked ? (
                  <div className={classes.like}>
                    <AiFillLike onClick={handleLikePost} />
                  </div>
                ) : (
                  <div className={classes.like}>
                    <AiOutlineLike onClick={handleLikePost} />
                  </div>
                )}
              </>
            )}
          </div>
          <div className={classes.descAndLikesViews}>
            <p className={classes.desc}>
              <span>Description: </span>
              {blogDetails?.desc}
            </p>
            <div className={classes.likesAndViews}>
              <span>{blogDetails?.views} views</span>
              <span>{blogDetails?.likes?.length} likes</span>
            </div>
          </div>
          <div className={classes.authorAndCreatedAt}>
            <span>
              <span>Author:</span> {blogDetails?.userId?.username}
            </span>
            <span>
              <span>Created At:</span> {format(blogDetails?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetails;*/

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
// { useSelector } from 'react-redux';
import { request } from '../../utils/fetchApi';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import { format } from 'timeago.js';
import {
  AiFillEdit,
  AiFillLike,
  AiFillDelete,
  AiOutlineArrowRight,
  AiOutlineLike,
} from 'react-icons/ai';
import classes from './blogDetails.module.css';
import Recent from '../../components/Recent/Recent';
import axios from 'axios'

const BlogDetails = () => {
  const [blogDetails, setBlogDetails] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  // { user, token } = useSelector((state) => state.auth);

  const data = JSON.parse(localStorage.getItem('currentUser'))
    const  token = data.token
    const user = data.user
//console.log('working' , token)
  useEffect(() => {
    
    const fetchBlogDetails = async () => {
      try {
        const options = { authorization: `Bearer ${token}` };
        const data = await request(`/blog/find/${id}`,'GET',{headers:options});
        setBlogDetails(data);
        setIsLiked(data.likes.includes(user._id));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBlogDetails();
  }, [id]);

  const handleLikePost = async () => {
    try {
      const options = { authorization: `Bearer ${token}` };
      await axios.put(`https://backendforblog-vdq1.onrender.com/blog/likeBlog/${id}`, {headers:options});
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteBlog = async () => {
    try {
      const options = { authorization: `Bearer ${token}` };
      await request(`/blog/deleteBlog/${id}`, 'DELETE', { headers:options});
    } catch (error) {
      console.error(error);
    }
  };

  const createMarkup = (html) => {
    return { __html: html };
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Link to='/' className={classes.goBack}>
          Go Back <AiOutlineArrowRight />
        </Link>
        <div className={classes.wrapper}>
          <img src={`https://backendforblog-vdq1.onrender.com/images/${blogDetails?.photo}`} alt={blogDetails?.title} />
          <div className={classes.titleAndControls}>
            <h3 className={classes.title}>{blogDetails?.title}</h3>
            {blogDetails?.userId?._id === user._id  && user1isAdmin? (
              <div className={classes.controls}>
                <Link to={`/updateBlog/${blogDetails?._id}`} className={classes.edit}>
                  <AiFillEdit />
                </Link>
                <div className={classes.delete}>
                  <AiFillDelete onClick={handleDeleteBlog} />
                </div>
              </div>
            ) : (
              <>
                {isLiked ? (
                  <div className={classes.like}>
                    <AiFillLike onClick={handleLikePost} />
                  </div>
                ) : (
                  <div className={classes.like}>
                    <AiOutlineLike onClick={handleLikePost} />
                  </div>
                )}
              </>
            )}
          </div>
          <div className={classes.descAndLikesViews}>
            <div dangerouslySetInnerHTML={createMarkup(blogDetails?.desc)} />
            <div className={classes.likesAndViews}>
              <span>{blogDetails?.views} views</span>
              <span>{blogDetails?.likes?.length} likes</span>
            </div>
          </div>
          <div className={classes.authorAndCreatedAt}>
            <span>
              <span>Author:</span> {blogDetails?.userId?.username}
            </span>
            <span>
              <span>Created At:</span> {format(blogDetails?.createdAt)}
            </span>
          </div>
        </div>
      </div>
      <Recent/>
      <Footer />
    </>
  );
};

export default BlogDetails;
