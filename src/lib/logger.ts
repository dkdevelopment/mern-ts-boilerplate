import log4js from 'log4js'
import { Request, Response, NextFunction } from 'express'

export const getLogger = (moduleName: string) => {
  const logger = log4js.getLogger(moduleName)
  logger.level = process.env.DEBUG_LEVEL || 'all'

  return logger
}

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const log = getLogger('app-middleware')
  const start = +new Date() // maybe change it one day to process.hrtime

  res.on('finish', () => {
    log.info(`[${req.method}][${res.statusCode}][${+new Date() - start}ms] - ${req.path}`)
  })

  next()
}