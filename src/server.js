import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', (req, res) => {
  res.send('<h1>Hello Nguyen Van Giang</h1>')
})

app.listen(port, hostname, () => {
  console.log(`Server is running on http://${hostname}:${port}`)
})