import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const [posts,setPosts] = useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  }, [cat])
/*
  const posts = [
    {
      id: 1,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      img: 'https://i.scdn.co/image/ab67616d0000b2732c42ea29d4b6d4950f6b66ed',
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      img: 'https://i.scdn.co/image/ab67616d0000b2732c42ea29d4b6d4950f6b66ed',
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      img: 'https://i.scdn.co/image/ab67616d0000b2732c42ea29d4b6d4950f6b66ed',
    },
    {
      id: 4,
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.',
      img: 'https://i.scdn.co/image/ab67616d0000b2732c42ea29d4b6d4950f6b66ed',
    },
  ] 
  
  */


  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html')
    return doc.body.textContent || ''
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className='img'>
              <img src={`../upload/${post.img}`} alt="" />
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>  
              <p> {getText(post.desc)} </p>
              <Link className="link" to={`/post/${post.id}`}>
              <button>Read More</button>
              </Link>
              
            </div>
          </div>
        ))}    
      </div>
    </div>
  )
}

export default Home