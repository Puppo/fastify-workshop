
export class NotFoundError extends Error {
  readonly name: string = 'NotFoundError';

  constructor(message: string) {
    super(message);
    
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}