import HttpException from './httpException';

class RandomError extends HttpException {
  constructor(status: number, message: string) {
    super(status, message, 'random.string');
  }
}

export default RandomError;
