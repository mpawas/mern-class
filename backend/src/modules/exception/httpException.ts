class HttpException extends Error {
  public status: number;
  public code?: number | string;
  public message: string;
  constructor(status: number, message: string, code?: string | number) {
    super(message);
    this.code = code;
    this.status = status;
    this.message = message;
  }
}

export default HttpException;
