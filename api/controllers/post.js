import { connection } from "../db.js"
import jwt from "jsonwebtoken"

export const getPosts = (req,res) => {
    const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat = ?" 
    : "SELECT * FROM posts"

    connection.query(q, [req.query.cat], (err, data) => {
        if(err) return res.status(500).send(err)
        return res.status(200).json(data)
    })
}


export const getPost = (req,res) => {
    const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?"

    connection.query(q,[req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)
        return res.status(200).json(data[0])
    })
}


export const addPost = (req, res) => {
    const { title, desc, img, cat, date } = req.body;
  
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
  
      const q = "INSERT INTO posts (title, `desc`, img, cat, date, uid) VALUES (?, ?, ?, ?, ?, ?)";
  
      connection.query(q, [title, desc, img, cat, date, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(201).json({ message: "Post added successfully", id: data.insertId });
      });
    });
  };


export const deletePost = (req,res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json({message: "Unauthorized"})

    jwt.verify(token,"jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json({message: "Token is not valid"})

        const postId = req.params.id
        const q = "DELETE FROM posts WHERE id = ? AND uid = ?"

        connection.query(q,[postId,userInfo.id], (err, data) => {
            if(err) return res.status(403).json("You can only delete your own post")
            return res.status(200).json({message: "Post deleted successfully"})
        })
    })
}


export const updatePost = (req, res) => {
    const postId = req.params.id;
    const { title, desc, img, cat } = req.body;
  
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json({ message: "Unauthorized" });
  
    jwt.verify(token, "jwtkey", (err, userInfo) => {
      if (err) return res.status(403).json({ message: "Token is not valid" });
  
      const q = "UPDATE posts SET title = ?, `desc` = ?, img = ?, cat = ? WHERE id = ? AND uid = ?";
  
      connection.query(q, [title, desc, img, cat, postId, userInfo.id], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.affectedRows === 0) {
          return res.status(404).json({ message: "Post not found or you are not authorized to edit it" });
        }
        return res.status(200).json({ message: "Post updated successfully" });
      });
    });
  };
