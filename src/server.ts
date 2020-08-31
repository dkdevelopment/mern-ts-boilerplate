import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { loggerMiddleware, getLogger } from './lib/logger'
import { connect, disconnect } from './lib/mongo'
import router from './router'
import { CoreException, Exception } from './lib/error'

const PORT = process.env.PORT || 5000
const app = express()

const log = getLogger('app')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(loggerMiddleware)

app.use('', router)

Promise.resolve()
  .then(async () => {
    // listening will start after all connections
    if (!process.env.MONGO_DB) {
      throw new CoreException('MONGO_DB is required to be in environment')
    }
    await connect()
    app.listen(PORT, () => {
      log.info('Listening on port - %o', PORT)
    })
  })
  .catch((error) => {
    if (error instanceof Exception) {
      error.log()
    } else {
      log.error('Error: %o', error.message)
    }
  })

const destroy = async () => {
  log.info('Destroying everything')
  await disconnect()
}

process.on('SIGTERM', destroy)
