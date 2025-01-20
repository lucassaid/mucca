import { MongoClient } from 'mongodb'
import { StrayedPetPost } from './types/StrayedPet'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI || !MONGODB_DB) {
  throw new Error('Missing MongoDB variables')
}
let connectionString = MONGODB_URI

if (connectionString.indexOf('appName') === -1)
  connectionString +=
    connectionString.indexOf('?') > -1 ? '&appName=remix|' : '?appName=remix|'
else
  connectionString = connectionString.replace(
    /appName=([a-z0-9]*)/i,
    (m, p) => `appName=remix|${p}`
  )

let mongodb: MongoClient

declare global {
  // eslint-disable-next-line no-var
  var __db: MongoClient | undefined
}

if (process.env.NODE_ENV === 'production') {
  mongodb = new MongoClient(connectionString)
} else {
  if (!global.__db) {
    global.__db = new MongoClient(connectionString)
  }
  mongodb = global.__db
}

const dbName = MONGODB_DB

const db = mongodb.db(dbName)

export { mongodb, dbName, db }

export const postsCollection = db.collection<StrayedPetPost>('posts')
