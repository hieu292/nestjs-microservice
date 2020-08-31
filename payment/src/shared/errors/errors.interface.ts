export interface IAppErrorData {
  errorCode: string;
  message: string;
  statusCode: number;
}

export class AppError extends Error {
  public data: IAppErrorData;

  constructor(data: IAppErrorData, message?: string) {
    super(message || data.message);

    this.name = this.constructor.name;

    this.data = data;
    if (message) {
      this.data.message = message;
    }
  }
}
