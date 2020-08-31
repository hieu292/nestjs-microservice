import {HttpStatus} from '@nestjs/common';

const getErrorCode = (errorCode: ErrorCode) => `0101${errorCode}`;

export enum ErrorCode {
  UNKNOWN_ERROR = '000',
  INTERNAL_SERVER_ERROR = '001',
  UNAUTHORIZED = '002',
  FORBIDDEN = '003',
  VALIDATION_ERROR = '004',
  NOT_FOUND = '005',
  NOT_ACCEPTABLE = '006',
}

export const AppErrors = {
  UNKNOWN_ERROR: {
    errorCode: getErrorCode(ErrorCode.UNKNOWN_ERROR),
    message: 'Unknown Error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  INTERNAL_SERVER_ERROR: {
    errorCode: getErrorCode(ErrorCode.INTERNAL_SERVER_ERROR),
    message: 'Internal Server Error',
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  UNAUTHORIZED: {
    errorCode: getErrorCode(ErrorCode.UNAUTHORIZED),
    message: 'Unauthorized',
    statusCode: HttpStatus.UNAUTHORIZED,
  },
  FORBIDDEN: {
    errorCode: getErrorCode(ErrorCode.FORBIDDEN),
    message: 'Forbidden',
    statusCode: HttpStatus.FORBIDDEN,
  },
  VALIDATION_ERROR: {
    errorCode: getErrorCode(ErrorCode.VALIDATION_ERROR),
    message: 'Validation Error',
    statusCode: HttpStatus.BAD_REQUEST,
  },
  NOT_FOUND: {
    errorCode: getErrorCode(ErrorCode.NOT_FOUND),
    message: 'Not found',
    statusCode: HttpStatus.NOT_FOUND,
  },
  NOT_ACCEPTABLE: {
    errorCode: getErrorCode(ErrorCode.NOT_ACCEPTABLE),
    message: 'Not acceptable',
    statusCode: HttpStatus.NOT_ACCEPTABLE,
  },
};
