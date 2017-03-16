'use strict'

import HttpHash from 'http-hash'
import {send, json} from 'micro'
import Db from 'hospesdb'
import config from './config'
import DbStub from './test/stub/db'

const env = process.env.NODE_ENV || 'production'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = new HttpHash()

hash.set('POST /', async function saveUser (req, res, params) {
  let user = await json(req)
  await db.connect()
  let created = await db.saveUser(user)
  await db.disconnect()

  delete created.email
  delete created.password

  send(res, 201, created)
})

// Logica para cuando saber como manejar una peticion
export default async function main (req, res) {
  let { method, url } = req

  // Validamos la ruta con get hacemos match de la ruta
  let match = hash.get(`${method.toUpperCase()} ${url}`)

  if (match.handler) {
    try {
      await match.handler(req, res, match.params)
    } catch (e) {
      send(res, 500, { error: e.message })
    }
  } else {
    send(res, 404, {error: 'route not found'})
  }
}
