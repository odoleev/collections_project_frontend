import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

// eslint-disable-next-line consistent-return
export function rtkErrorHandler(
  error: FetchBaseQueryError | SerializedError
): any {
  if (error) {
    if ('status' in error) {
      const errMsg = 'error' in error ? error.error : error.data;

      return typeof errMsg === 'string' ? JSON.parse(errMsg) : errMsg;
    }

    return error.message;
  }
}
