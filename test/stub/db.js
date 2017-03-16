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
}
