'use strict'

import HttpHash from 'http-hash'
import {send} from 'micro'
import Db from 'hospesdb'
import config from './config'
import DbStub from './test/stub/db'

const env = process.env.NODE_ENV || 'production'
let db = new Db(config.db)

if (env === 'test') {
  db = new DbStub()
}

const hash = new HttpHash()

// Definimos la ruta
hash.set('GET /:id', async function getBlog (req, res, params) {
  let id = params.id
  await db.connect()
  let blog = await db.getBlog(id)
  await db.disconnect()

  send(res, 200, blog)
})

// Logica para cuando saber como manejar una peticion
export default async function main (req, res) {
  let { method, url } = req

  // Validamos la ruta
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
