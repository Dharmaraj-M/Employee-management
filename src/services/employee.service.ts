import {BindingScope, inject, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Response, RestBindings} from '@loopback/rest';
import {Employee, EmployeeRequest} from '../models';
import {EmployeeRepository} from '../repositories';
import {CommonService} from './common.service';

@injectable({scope: BindingScope.TRANSIENT})
export class EmployeeService {
  constructor(
    @repository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @service(CommonService) private commonService: CommonService,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
  ) {}

  async getAllEmployees(): Promise<Response> {
    const empList: Employee[] = await this.employeeRepository.find();
    if (empList && empList.length > 0) {
      return this.commonService.mapResponse('success', 200, empList);
    } else {
      return this.commonService.mapResponse(
        'error',
        404,
        {},
        'No employees available',
      );
    }
  }

  async getEmployeeById(employeeId: string): Promise<Response> {
    const employee: Employee = await this.employeeRepository.findById(
      employeeId,
    );
    return this.commonService.mapResponse('success', 200, employee);
    // try {
    // } catch (error) {
    //   if (error['code'] === 'ENTITY_NOT_FOUND') {
    //     return this.mapResponse('error', 404, {}, 'Employee not found');
    //   } else {
    //     return this.mapResponse('error', 500, {}, 'Internal Server Error');
    //   }
    // }
  }

  async createEmployee(employeeRequest: EmployeeRequest): Promise<Response> {
    if (employeeRequest.age < 18) {
      throw new Error('Employee age must be greater than 18');
    }
    const employee: Employee = await this.employeeRepository.create(
      employeeRequest,
    );
    return this.commonService.mapResponse('success', 200, employee);
  }

  // private mapResponse(
  //   status: string,
  //   statusCode: number,
  //   data: object,
  //   message?: string,
  // ): Response {
  //   const apiResponse: ApiResponse = new ApiResponse();
  //   if (status === 'success') {
  //     apiResponse.status = status;
  //     apiResponse.statusCode = statusCode;
  //     apiResponse.data = data;
  //   } else if (status === 'error') {
  //     apiResponse.status = status;
  //     apiResponse.statusCode = statusCode;
  //     apiResponse.message = message;
  //   }
  //   return this.response.status(statusCode).send(apiResponse);
  // }
}
