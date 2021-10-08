import {service} from '@loopback/core';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  Response,
} from '@loopback/rest';
import {EmployeeRequest} from '../models';
import {EmployeeService} from '../services';

export class EmployeeController {
  constructor(
    @service(EmployeeService) private employeeService: EmployeeService,
  ) {}

  @get('/employees')
  getAllEmployees(): Promise<Response> {
    return this.employeeService.getAllEmployees();
  }

  @get('/employees/{employeeId}')
  getEmployeeById(
    @param.path.string('employeeId') employeeId: string,
  ): Promise<Response> {
    return this.employeeService.getEmployeeById(employeeId);
  }

  @post('/employees')
  async createEmployee(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EmployeeRequest),
        },
      },
      required: true,
    })
    employeeRequest: EmployeeRequest,
  ): Promise<Response> {
    return this.employeeService.createEmployee(employeeRequest);
  }
}
