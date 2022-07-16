const blogsRouter = require("express").Router()
const Blog = require("../models/blog")



blogsRouter.get("/",async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs.map(blog => blog.toJSON()))
})

/*
blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  */
  blogsRouter.post("/",async (request, response) => {
      const body = request.body
      if (!body.title){
        return response.status(400).json({error: "title missing"})
      }
      if (!body.url){
        return response.status(400).json({error: "url missing"})
      }
      if (!body.likes){
        body.likes = 0
      }

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
      })
      
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
      })
  

  module.exports = blogsRouter