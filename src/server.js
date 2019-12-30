import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const curPort = 3000

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(
  urlencoded({
    extended: true
  })
)
app.use(morgan('dev')) // logging

const log = (req, res, next) => {
  console.log('logging middleware.')
  next()
}

app.use(log)

const apiRouter = express.Router()

apiRouter.get('/person', (req, res) => {
  res.send({
    message: 'Hey there, welcome to the api route!'
  })
})

app.use('/api', apiRouter)

app.get('/', (req, res) => {
  res.send({
    message: 'Hello'
  })
})
app.post('/', (req, res) => {
  console.log(req.body)
  res.send({
    message: 'ok'
  })
})

app.get('/data', (req, res) => {
  res.send({
    message: 'Hello There! This is the data route'
  })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(curPort, () => {
    console.log(`server is on port ${curPort}`)
  })
}
