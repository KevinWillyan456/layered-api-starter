import { HttpStatus } from '../enums/httpStatus'

export class HttpError extends Error {
  statusCode: HttpStatus

  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST
  ) {
    super(message)
    this.statusCode = statusCode
    Object.setPrototypeOf(this, HttpError.prototype)
  }
}
