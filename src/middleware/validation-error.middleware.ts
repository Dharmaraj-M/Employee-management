import {injectable, Provider} from '@loopback/core';
import {
  asMiddleware,
  HttpErrors,
  Middleware,
  MiddlewareContext,
  Response,
  RestMiddlewareGroups,
} from '@loopback/rest';
import {ApiResponse} from '../models';

@injectable(
  asMiddleware({
    group: 'validationError',
    upstreamGroups: RestMiddlewareGroups.SEND_RESPONSE,
    downstreamGroups: RestMiddlewareGroups.CORS,
  }),
)
export class ValidationErrorMiddlewareProvider implements Provider<Middleware> {
  async value() {
    const middleware: Middleware = async (ctx, next) => {
      try {
        return await next();
      } catch (err) {
        return this.handleError(ctx, err as HttpErrors.HttpError);
      }
    };
    return middleware;
  }

  handleError(
    context: MiddlewareContext,
    err: HttpErrors.HttpError,
  ): Response | undefined {
    if (err.statusCode === 422) {
      let apiResponse = new ApiResponse();
      apiResponse.statusCode = 422;
      apiResponse.status = 'error';
      apiResponse.data = {details: err['details']};
      apiResponse.message = 'VALIDATION_FAILED';
      return context.response.status(apiResponse.statusCode).send(apiResponse);
    } else {
      throw err;
    }
  }
}
