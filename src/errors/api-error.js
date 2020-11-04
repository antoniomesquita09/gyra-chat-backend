import httpStatus from 'http-status';

import ExtendableError from './extendable-error';

class APIError extends ExtendableError {
  constructor(message, status = httpStatus.INTERNAL_SERVER_ERROR) {
    super(message, status);
  }
}

export default APIError;
