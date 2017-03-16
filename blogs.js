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

// Get list blogs
hash.set('GET /list', async function list (req, res, params) {
  await db.connect()
  let blogs = await db.getBlogs()
  await db.disconnect()

  send(res, 200, blogs)
})

// Definimos la ruta obtener blog
hash.set('GET /:id', async function getBlog (req, res, params) {
  let id = params.id
  await db.connect()
  let blog = await db.getBlog(id)
  await db.disconnect()

  send(res, 200, blog)
})

// Save Blog Route
hash.set('POST /', async function postBlog (req, res, params) {
  let blog = await json(req)

  await db.connect()
  let created = await db.saveBlog(blog)
  await db.disconnect()
  send(res, 201, created)
})

hash.set('POST /:id/like', async function likeBlog (req, res, params) {
  let id = params.id
  await db.connect()
  let blog = await db.likeBlog(id)
  await db.disconnect()

  send(res, 201, blog)
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
