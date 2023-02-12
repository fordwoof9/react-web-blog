import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = ({cat}) => {
  const [posts,setPosts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try{
        const res = await axios.get(`/posts/?cat=${cat}`)
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

  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
        {posts.map((post) => (
            <div className='post' key={post.id}>
                <img src={`../upload/${post?.img}`} alt=''></img>
                <h2>{post.title}</h2>
                <Link to = {`/post/${post.id}`}>
                  <button>Read More</button>
                </Link>
            </div>
        ))}
    </div>
  )
}

export default Menu