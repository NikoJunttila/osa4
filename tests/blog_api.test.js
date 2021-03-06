const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require('./test_helper')
const bcrypt = require("bcrypt")
const User = require("../models/user")


beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')
 const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
 const promiseArray = blogObjects.map(blog => blog.save())
 await Promise.all(promiseArray)
 
})


describe("when there is one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash("sekret", 10)
    const user = new User({ username: "root", passwordHash})
    
    await user.save()
  })

  test("creating succeeds with a new name", async () => {
    const userAtStart = await helper.usersInDb()

    const newUser = {
      username :"randomderp",
      name:"derp",
      password: "salainen"
    }

    await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(userAtStart.length + 1)

    const usernames = usersAtEnd.map(a => a.username)
    expect(usernames).toContain(newUser.username)
  })
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].title).toBe('testing')
  })

  test('a specific note is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.author)
  
    expect(contents).toContain(
      'someone'
    )
  })

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'vykas g1 trolling',
      author: "judog",
      url: "twitch.tv/bang_bros1",
      likes: "5",
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
      const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(a => a.title)
  

    expect(title).toContain(
      'vykas g1 trolling'
    )
  })
  test('id field checker', async () => {
    const response = await api.get('/api/blogs')
    const id = response.body.map(r => r.id)
    
    id.forEach(a => expect(a).toBeDefined())
  })

test("missing title",async () => {
  const newBlog = {
    author: "sineberry",
    url: "leagueoflegends.com",
    likes: "5",
  }
  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})

test("missing url",async () => {
  const newBlog = {
    title:"jungle guide",
    author: "sineberry",
    likes: "5",
  }
  await api
  .post("/api/blogs")
  .send(newBlog)
  .expect(400)
  
  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
})
test("blog is deleted", async() => {
  await api
  .delete("/api/blogs/5a422a851b54a676234d17f7")
  .expect(204)
})



afterAll(() => {
  mongoose.connection.close()
})