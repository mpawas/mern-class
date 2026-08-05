import HttpException from './httpException';

class UserNotFoundError extends HttpException {
  constructor(status: number, message: string) {
    super(status, message, 'user.not.found');
  }
}

export default UserNotFoundError;

// {
//   status: '404,
//   code:"user.not.found",
//   message:"abad"
// }
