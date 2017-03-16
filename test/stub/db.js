'use strict'
import fixtures from '../fixtures/'

export default class Db {
  connect () {
    return Promise.resolve(true)
  }

  disconnect () {
    return Promise.resolve(true)
  }

  getBlog (id) {
    return Promise.resolve(fixtures.getBlog())
  }

  saveBlog (blog) {
    return Promise.resolve(fixtures.getBlog())
  }

  likeBlog (id) {
    let blog = fixtures.getBlog()
    blog.liked = true
    blog.likes = 1
    return Promise.resolve(blog)
  }

  getBlogs () {
    return Promise.resolve([fixtures.getBlog(), fixtures.getBlog(), fixtures.getBlog()
    ])
  }
}
