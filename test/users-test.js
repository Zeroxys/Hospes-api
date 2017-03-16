'use strict'

import test from 'ava'
import request from 'request-promise'
import micro from 'micro'
import listen from 'test-listen'
import users from '../users'
import fixtures from './fixtures'

test.beforeEach(async t => {
  let server = micro(users)
  t.context.url = await listen(server)
})

// Save user
test('POST /', async t => {
  let user = fixtures.getUser()
  let url = t.context.url

  let options = {
    method: 'POST',
    uri: url,
    json: true,
    body: {
      name: user.name,
      username: user.username,
      password: user.password,
      email: user.email
    },
    resolveWithFullResponse: true
  }

  let response = await request(options)

  delete user.email
  delete user.password

  t.is(response.statusCode, 201)
  t.deepEqual(response.body, user)
})

// Get user
test('GET /:username', async t => {
  let user = fixtures.getUser()
  let url = t.context.url

  let options = {
    method: 'GET',
    uri: `${url}/${user.username}`,
    json: true
  }

  let body = await request(options)

  delete user.email
  delete user.password

  t.deepEqual(body, user)
})
