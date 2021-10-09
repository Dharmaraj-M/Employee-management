import {
  globalInterceptor,
  Interceptor,
  InvocationContext,
  InvocationResult,
  Provider,
  service,
  ValueOrPromise,
} from '@loopback/core';
import {CommonService} from '../services';

@globalInterceptor('', {tags: {name: 'Global'}})
export class GlobalInterceptor implements Provider<Interceptor> {
  constructor(@service(CommonService) private commonService: CommonService) {}

  value() {
    return this.intercept.bind(this);
  }

  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      console.log('log: before-' + invocationCtx.methodName);
      const result = await next();
      console.log('log: after-' + invocationCtx.methodName);
      return result;
    } catch (error) {
      if (error['code'] === 'ENTITY_NOT_FOUND') {
        return this.commonService.mapResponse(
          'error',
          404,
          {},
          'ENTITY_NOT_FOUND',
        );
      } else if (error['code'] === 'VALIDATION_FAILED') {
        return this.commonService.mapResponse(
          'error',
          422,
          {error: error},
          'VALIDATION_FAILED',
        );
      } else if (error['code'] === 'INVALID_PARAMETER_VALUE') {
        return this.commonService.mapResponse(
          'error',
          422,
          {error: error},
          'INVALID_PARAMETER_VALUE',
        );
      } else if (error['code'] === 'MISSING_REQUIRED_PARAMETER') {
        return this.commonService.mapResponse(
          'error',
          422,
          {error: error},
          'MISSING_REQUIRED_PARAMETER',
        );
      } else if (error['message']) {
        return this.commonService.mapResponse(
          'error',
          400,
          {error: error},
          error['message'],
        );
      } else {
        return this.commonService.mapResponse(
          'error',
          500,
          {stack: error['stack']},
          'Internal Server Error',
        );
      }
    }
  }
}
