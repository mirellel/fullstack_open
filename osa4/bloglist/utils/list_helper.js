const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    let total = 0
    likes = blogs.map(({likes}) => likes)
    if (blogs.length == 0) {
        return 0
    } else {
        for (let i = 0; i < blogs.length; i++) {
        total += likes[i]
    }
    return total
}}

module.exports = {
    dummy,
    totalLikes
}
