const lodash = require('lodash')

const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.lenght === 0
        ? 0
        : blogs.reduce((favourite, blog) => blog.likes > favourite.likes ? blog : favourite, blogs[0])
}

const mostBlogs = (blogs) => {
    const blogCount = lodash.countBy(blogs, 'author')
    const authorKey = Object.keys(blogCount)[0]
    const first = {
        author: authorKey,
        blogs: blogCount[authorKey]
    }

    const top = Object.keys(blogCount).reduce((max, key) => blogCount[key] > max.blogs ? {author: key, blogs: blogCount[key]} : max, first)
    return top.author === undefined
        ? 0
        : top
}

const mostLikes = (blogs) => {
    const authorsBlogs = lodash.groupBy(blogs, 'author')
    const authorsLikes = lodash.mapValues(authorsBlogs, likes => lodash.sumBy(likes, 'likes'))
    const top = lodash.maxBy(Object.keys(authorsLikes), author => authorsLikes[author])
    return top === undefined
        ? 0
        : [
            author = top,
            likes = authorsLikes[top]
        ]
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}
