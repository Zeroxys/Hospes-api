'use strict'

import test from 'ava'
import request from 'request-promise'
import micro from 'micro'
import listen from 'test-listen'
import blogs from '../blogs'
import fixtures from './fixtures/'

// Method for getPost
test('GET /:id', async t => {
  let blog = fixtures.getBlog()

  let server = micro(blogs)

  let url = await listen(server)
  let body = await request({ uri: `${url}/${blog.public_id}`, json: true })

  t.deepEqual(body, blog)
})

// Method for pushPost
// test.todo('POST /')

// Method for likePost
// test.todo('POST like/:id')
