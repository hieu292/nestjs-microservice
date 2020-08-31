import {HttpException} from '@nestjs/common';
import {AppErrors} from './errors';
import {AppError, IAppErrorData} from './errors.interface';

export function getAppErrorData(err: any): IAppErrorData {
  if (!err) {
    return AppErrors.INTERNAL_SERVER_ERROR;
  }

  if (err instanceof AppError) {
    return err.data;
  }

  if (err instanceof HttpException) {
    return {
      errorCode: AppErrors.UNKNOWN_ERROR.errorCode,
      statusCode: err.getStatus(),
      message: err.message,
    };
  }

  return {
    ...AppErrors.UNKNOWN_ERROR,
    message: String(err),
  };
}
