import { connect as mongoConnect, Db, MongoClient } from 'mongodb'
import { getLogger } from './logger'
import { Exception } from './error'

let db: Db
let client: MongoClient
const log = getLogger('db')

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017'

export const connect = async () => {
  log.debug('Connecting to mongo database')
  client = await mongoConnect(uri, { useUnifiedTopology: true })
  log.debug('Connected to mongo database')

  db = client.db(process.env.MONGO_DB)
}

export const disconnect = async () => {
  await client.close(true)
}

const getDb = (otherDb?: string) => {
  if (otherDb) {
    return client.db(otherDb)
  }
  if (!db) {
    log.error('Database not exists')
    throw new Exception('Database not exists')
  }
  return db
}

export default getDb