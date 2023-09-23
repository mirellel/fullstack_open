const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]

    const listWithZeroBlogs = []

    const listWithMoreBlogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            _id: '179uejqwkjd9812jla98d0',
            title: 'Filis Blog',
            author: 'Tammikilpi, Fili',
            url: 'http://blogspot/filisblog.com',
            likes: 3,
            __v: 0
        },
        {
            _id: '8jsk893kkd993r',
            title: 'Suffelis Blog',
            author: 'Kitty, Suffeli',
            url: 'http://blogspot/suffisblog.com',
            likes: 2,
            __v: 0
        }
    ]
  
    test('when list has only one blog equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has no blogs likes equals 0', () => {
        const result = listHelper.totalLikes(listWithZeroBlogs)
        expect(result).toBe(0)
      })
    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMoreBlogs)
        expect(result).toBe(10)
    }) 
  })
