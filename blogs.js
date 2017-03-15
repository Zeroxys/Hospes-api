'use strict'

import HttpHash from 'http-hash'
import {send} from 'micro'

const hash = new HttpHash()

// Definimos la ruta
hash.set('GET /:id', async function getBlog (req, res, params) {
  send(res, 200, params)
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
    send(res, 404, {error: 'rout not found'})
  }
}
