'use strict'

import test from 'ava'
import request from 'request-promise'
import micro from 'micro'
import listen from 'test-listen'
import blogs from '../blogs'
import fixtures from './fixtures'

test.beforeEach(async t => {
  let server = micro(blogs)
  t.context.url = await listen(server)
})

// Get a Blog Test
test('GET /:id', async t => {
  let blog = fixtures.getBlog()
  let url = t.context.url

  let body = await request({ uri: `${url}/${blog.public_id}`, json: true })

  t.deepEqual(body, blog)
})

// Save a blog Test
test('POST /', async t => {
  let blog = fixtures.getBlog()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body: {
      description: blog.description,
      src: blog.src,
      userId: blog.userId
    },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, blog)
})

// Method for like a Blog
test('POST like/:id', async t => {
  let blog = fixtures.getBlog()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: `${url}/${blog.id}/like`,
    json: true
  }

  let body = await request(options)
  let blogNew = JSON.parse(JSON.stringify(blog))
  blogNew.liked = true
  blogNew.likes = 1

  t.deepEqual(body, blogNew)
})

// Method for get Blogs Test
test('GET /blogs', async t => {
  let blogs = fixtures.getBlogs()
  let url = t.context.url

  let options = {
    method: 'GET',
    uri: `${url}/list`,
    json: true
  }

  let body = await request(options)

  t.deepEqual(body, blogs)
})
