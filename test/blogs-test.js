'use strict'

import request from 'request-promise' // Permite hacer peticiones con Promises
import test from 'ava'
import micro, { send } from 'micro'
import uuid from 'uuid-base62'
import listen from 'test-listen' // Permite hacer testing de microservicios con micro

test('GET /:id', async t => {
  let id = uuid.v4()

  let service = micro(async (req, res) => {
    send(res, 200, { id: id })
  })

  let url = await listen(service)
  let body = await request({ uri: url, json: true })

  t.deepEqual(body, { id })
})

test.todo('POST /')
test.todo('POST like/:id')
