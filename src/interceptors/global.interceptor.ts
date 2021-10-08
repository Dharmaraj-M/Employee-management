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

/**
 * This class will be bound to the application as an `Interceptor` during
 * `boot`
 */
@globalInterceptor('', {tags: {name: 'Global'}})
export class GlobalInterceptor implements Provider<Interceptor> {
  constructor(@service(CommonService) private commonService: CommonService) {}

  /**
   * This method is used by LoopBack context to produce an interceptor function
   * for the binding.
   *
   * @returns An interceptor function
   */
  value() {
    return this.intercept.bind(this);
  }

  /**
   * The logic to intercept an invocation
   * @param invocationCtx - Invocation context
   * @param next - A function to invoke next interceptor or the target method
   */
  async intercept(
    invocationCtx: InvocationContext,
    next: () => ValueOrPromise<InvocationResult>,
  ) {
    try {
      // Add pre-invocation logic here
      const result = await next();
      // Add post-invocation logic here
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
          400,
          {},
          'VALIDATION_FAILED',
        );
      } else if (error['code'] === 'INVALID_PARAMETER_VALUE') {
        return this.commonService.mapResponse(
          'error',
          400,
          {},
          'INVALID_PARAMETER_VALUE',
        );
      } else if (error['code'] === 'MISSING_REQUIRED_PARAMETER') {
        return this.commonService.mapResponse(
          'error',
          400,
          {},
          'MISSING_REQUIRED_PARAMETER',
        );
      } else if (error['message']) {
        return this.commonService.mapResponse(
          'error',
          400,
          {},
          error['message'],
        );
      } else {
        return this.commonService.mapResponse(
          'error',
          500,
          Object.assign({}, error),
          'Internal Server Error',
        );
      }
    }
  }
}
