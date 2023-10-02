/*import React from 'react'
import { useState } from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import classes from './create.module.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { request } from '../../utils/fetchApi'

const Create = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [img, setImg] = useState("")
  const [category, setCategory] = useState("")
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)

  const categories = [
    'Soul Mantra',
    'Life Lessons',
    'Peace',
    'Joy',
  ]

  const onChangeFile = (e) => {
    setImg(e.target.files[0])
  }

  const handleCloseImg = () => {
    setImg(null)
  }

  const handleCreateBlog = async (e) => {
    e.preventDefault()

    try {
      const formData = new FormData()

      let filename = null
      if (img) {
        filename = crypto.randomUUID() + img.name
        formData.append("filename", filename)
        formData.append("image", img)

        await fetch(`http://localhost:5000/upload`, {
          method: "POST",
          body: formData
        })
      } else {
        return
      }

      const options = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }

      const body = {
        title,
        desc,
        category,
        photo: filename
      }


      const data = await request('/blog', "POST", options, body)
      navigate(`/blogDetails/${data._id}`)

    } catch (error) {
      console.error(error)
    }
  }
 console.log(category)
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Create Blog</h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <label>Title: </label>
              <input
                type="text"
                placeholder='Title...'
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>Description: </label>
              <input
                type="text"
                placeholder='Description...'
                className={classes.input}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapperSelect}>
              <label>Category: </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {categories.map((category) => (
                  <option key={crypto.randomUUID()} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <div className={classes.inputWrapperImg}>
              <label htmlFor='image' className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: 'none' }}
              />
              {img && <p className={classes.imageName}>{img.name} <AiOutlineCloseCircle className={classes.closeIcon} onClick={() => handleCloseImg()} /></p>}
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.submitBtn} type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default <Create></Create>*/


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useSelector } from 'react-redux';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { request } from '../../utils/fetchApi';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navbar/Navbar';
import classes from './create.module.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const Create = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
const [category, setCategory] = useState('');
  const navigate = useNavigate();
//const { token } = useSelector((state) => state.auth);

  const categories = ['Soul Mantra', 'Life Lessons', 'Peace', 'Joy'];
  const data = JSON.parse(localStorage.getItem('currentUser'))
  const  token = data.token
  const onChangeFile = (e) => {
    setImg(e.target.files[0]);
  };

  const handleCloseImg = () => {
    setImg(null);
  };

  const handleCreateBlog = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      let filename = null;
      if (img) {
        filename = crypto.randomUUID() + img.name;
        formData.append('filename', filename);
        formData.append('image', img);

        await fetch(`http://localhost:5000/upload`, {
          method: 'POST',
          body: formData,
        });
      } else {
        return;
      }

      const options = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const body = {
        title,
        desc,
        category,
        photo: filename,
      };

      const data = await request('/blog', 'POST', options, body);
      navigate(`/blogDetails/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <h2 className={classes.title}>Create Blog</h2>
          <form onSubmit={handleCreateBlog} encType="multipart/form-data">
            <div className={classes.inputWrapper}>
              <label>Title: </label>
              <input
                type="text"
                placeholder="Title..."
                className={classes.input}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={classes.inputWrapper}>
              <label>description</label>
              <ReactQuill
                value={desc}
                onChange={(value) => setDesc(value)}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false]}],
                    [{ font: [1,2,3,4,5,6 ,7,8 , 9 , 10 ,11] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                      { list: 'ordered' },
                      { list: 'bullet' },
                      { indent: '-1' },
                      { indent: '+1' },
                    ],
                    ['link', 'image', 'video'],
                    [{ color: [] }, { background: [] }],
                    [{ align: [] }],
                    ['clean'],
                    ['font', 'size', 'subtitle'],
                  ],
                }}
                theme="snow"
                className={classes.ql}
              />

            </div>
            <div className={classes.inputWrapperSelect}>
              <label>Category: </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className={classes.inputWrapperImg}>
              <label htmlFor="image" className={classes.labelFileInput}>
                Image: <span>Upload here</span>
              </label>
              <input
                id="image"
                type="file"
                className={classes.input}
                onChange={onChangeFile}
                style={{ display: 'none' }}
              />
              {img && (
                <p className={classes.imageName}>
                  {img.name}{' '}
                  <AiOutlineCloseCircle
                    className={classes.closeIcon}
                    onClick={handleCloseImg}
                  />
                </p>
              )}
            </div>
            <div className={classes.buttonWrapper}>
              <button className={classes.submitBtn} type="submit">
                Submit form
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Create;
