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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
