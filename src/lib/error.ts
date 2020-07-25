import { getLogger } from './logger'

const log = getLogger('exception')

export class Exception extends Error {
  type: string = 'DEFAULT'
  constructor(message: string) {
    super(message)
  }

  log() {
    log.error(`[${this.type}] Error: ${this.message}`)
  }
}

export class CoreException extends Exception {
  type = 'CORE'
}