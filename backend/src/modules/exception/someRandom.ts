import HttpException from './httpException';

class RandomError extends HttpException {
  public status: number;
  public code: number | string;
  public message: string;
  constructor(status: number, message: string, code: 'random.string') {
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
