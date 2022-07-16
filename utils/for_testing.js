const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) =>{
    if(blogs.length === 0){
        return 0
    }else{
      const total = blogs.map(blog => blog.likes).reduce((a,b)=>a+b,0)
      return total
    }
}

const favoriteBlog = (blogs) =>{
    const most = [].concat(blogs)
    most.sort(function(a,b){return b.likes - a.likes})
    const bestBlog = {
        title: most[0].title,
        author: most[0].author,
        likes: most[0].likes
    }
    return bestBlog
}

/*
const reverse = (string) => {
    return string
      .split('')
      .reverse()
      .join('')
  }
  
  const average = array => {
    const reducer = (sum, item) => {
      return sum + item
    }
    return array.length === 0
      ? 0 
      : array.reduce(reducer, 0) / array.length
  }
  */


  module.exports = {
// reverse,
//average,
    dummy,
    totalLikes,
    favoriteBlog,
  }