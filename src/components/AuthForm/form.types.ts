import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { loginSchema, registrationSchema } from '../../helpers/schemas';
import { IFormField } from '../../types/formField';

export interface IForm {
  buttonText: string;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  isError: boolean;
  error: FetchBaseQueryError | SerializedError | undefined;
  schema: typeof loginSchema | typeof registrationSchema;
  fields: Array<IFormField>;
}
