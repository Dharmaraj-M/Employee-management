import {BindingScope, inject, injectable} from '@loopback/core';
import {Response, RestBindings} from '@loopback/rest';
import {ApiResponse} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class CommonService {
  constructor(@inject(RestBindings.Http.RESPONSE) private response: Response) {}

  mapResponse(
    status: string,
    statusCode: number,
    data: object,
    message?: string,
  ): Response {
    const apiResponse: ApiResponse = new ApiResponse();
    if (status === 'success') {
      apiResponse.status = status;
      apiResponse.statusCode = statusCode;
      apiResponse.data = data;
    } else if (status === 'error') {
      apiResponse.status = status;
      apiResponse.statusCode = statusCode;
      apiResponse.message = message;
    }
    return this.response.status(statusCode).send(apiResponse);
  }
}
