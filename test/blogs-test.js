'use strict'

import test from 'ava'
import request from 'request-promise'
import micro from 'micro'
import uuid from 'uuid-base62'
import listen from 'test-listen'
import blogs from '../blogs'

// Method for getPost
test('GET /:id', async t => {
  let id = uuid.v4()

  let server = micro(blogs)

  let url = await listen(server)
  let body = await request({ uri: `${url}/${id}`, json: true })

  t.deepEqual(body, { id })
})

// Method for pushPost
// test.todo('POST /')

// Method for likePost
// test.todo('POST like/:id')
