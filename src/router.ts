import express, { Router } from 'express'
import path from 'path'

const router = Router()

router.use(express.static(path.join(__dirname, 'client/build')))

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

export default router
