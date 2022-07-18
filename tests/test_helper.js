const Blog = require("../models/blog")
const User = require("../models/user")

const initialBlogs = [
    {
  _id:"62d2b7ab7537a73f0fdfac2c",
  title:"testing",
  author:"someone",
  url:"www",
  likes:"5",
  },
  {
    _id:"62d2e292d8d2e027523ebc3a",
    title:"second",
    author:"nobody",
    url:"idk",
    likes:"2",
  }
  ]

  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(a => a.toJSON())
}


  module.exports = {
    initialBlogs, blogsInDb, usersInDb
  }