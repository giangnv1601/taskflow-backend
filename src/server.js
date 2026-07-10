/* eslint-disable no-console */
import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb.js'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'

const START_SERVER = () => {
  const app = express()

  app.use('/v1', APIs_V1)

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`3. Hi ${env.AUTHOR}, Server is running successfully at Host: ${env.APP_HOST} and Port: ${env.APP_PORT}`)
  })

  // Thực hiện các tác vụ cleanup trước khi dừng server
  exitHook(() => {
    console.log('4. Closing MongoDB connection...')
    CLOSE_DB()
    console.log('5. MongoDB connection closed successfully!')
  })
}

// Chỉ khi kết nối tới Database thành công thì chúng ta mới khởi chạy Server
// Immediately-invoked / Anonymous Async Function (IIFE)
/**
(async () => {
  try {
    console.log('1. Connecting to MongoDB Atlas...')
    await CONNECT_DB()
    console.log('2. Connected to MongoDB Atlas successfully!')
    START_SERVER()
  } catch (error) {
    console.error(error)
    process.exit(0)
  }
})
*/

// Chỉ khi kết nối tới Database thành công thì chúng ta mới khởi chạy Server
console.log('1. Connecting to MongoDB Atlas...')
CONNECT_DB()
  .then(() => console.log('2. Connected to MongoDB Atlas successfully!'))
  .then(() => START_SERVER())
  .catch((error) => {
    console.error(error)
    process.exit(0)
  })
