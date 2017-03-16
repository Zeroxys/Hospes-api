export default {
  getBlog () {
    return {
      id: '17hlQcrRmEsmerNvKMC6Q0',
      publicId: '24b6fe7a-8bbb-4612-aafc-56cf3296b300',
      userId: 'Miguel Zavala',
      src: 'http://hospes.com/blog/17hlQcrRmEsmerNvKMC6Q0',
      liked: false,
      likes: 0,
      description: 'description',
      createdAt: new Date().toString()
    }
  },

  getBlogs () {
    return [this.getBlog(), this.getBlog(), this.getBlog()]
  },

  getUser () {
    return {
      id: '24b6fe7a-8bbb-4612-aafc-56cf3296b300',
      name: 'Miguel Zavala',
      username: 'Miguel',
      email: 'miguel@mail.com',
      password: 'miguel123',
      createdAt: new Date().toString()
    }
  }
}
