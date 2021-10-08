import {inject, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import {EmployeeRequest} from '../models';
import {EmployeeRepository} from '../repositories';
import {EmployeeService} from '../services';

export class EmployeeController {
  constructor(
    @repository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @inject(RestBindings.Http.RESPONSE) private response: Response,
    @service(EmployeeService) private employeeService: EmployeeService,
  ) {}

  // @get('/employees')
  // async getAllEmployees(): Promise<Response> {
  //   return this.response.status(200).send(await this.employeeRepository.find());
  // }

  // @get('/employees')
  // async getAllEmployees(): Promise<ApiResponse> {
  //   const apiResponce: ApiResponse = new ApiResponse();
  //   const employee = await this.employeeService.getAllEmployees();
  //   if (employee !== undefined || null) {
  //     apiResponce.status = 'success';
  //     apiResponce.statusCode = 200;
  //     apiResponce.data = employee;
  //     return apiResponce;
  //   } else {
  //     apiResponce.status = 'error';
  //     apiResponce.statusCode = 500;
  //     apiResponce.message = 'Unable to get all employees. Server Error';
  //     return apiResponce;
  //   }
  // }

  // @get('/employees')
  // getAllEmployees(): void {
  //   const apiResponse: Promise<ApiResponse> =
  //     this.employeeService.getAllEmployees();
  //   apiResponse.then(
  //     onfulfilled => {
  //       return this.response.status(onfulfilled.statusCode).send(onfulfilled);
  //     },
  //     onrejected => {
  //       return this.response.status(onrejected.statusCode).send(onrejected);
  //     },
  //   );
  // }

  @get('/employees')
  getAllEmployees(): Promise<Response> {
    return this.employeeService.getAllEmployees();
  }
  // @get('/employees/{employeeId}')
  // async getEmployeeById(
  //   @param.path.string('employeeId') employeeId: string,
  // ): Promise<Response> {
  //   const employee = await this.employeeRepository.findById(employeeId);
  //   if (employee !== null) {
  //     return this.response.status(200).send(employee);
  //   } else {
  //     console.log('else');
  //     return this.response;
  //   }
  // }

  // @get('/employees/{employeeId}')
  // getEmployeeById(
  //   @param.path.string('employeeId') employeeId: string,
  // ): Promise<ApiResponse> {
  //   return this.employeeService.getEmployeeById(employeeId);
  // }

  @get('/employees/{employeeId}')
  getEmployeeById(
    @param.path.string('employeeId') employeeId: string,
  ): Promise<Response> {
    return this.employeeService.getEmployeeById(employeeId);
  }

  // @post('/employees')
  // async createEmployee(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(EmployeeRequest),
  //       },
  //     },
  //     required: true,
  //   })
  //   employee: EmployeeRequest,
  // ): Promise<Response> {
  //   return this.response
  //     .status(200)
  //     .send(await this.employeeRepository.create(employee));
  // }

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

  // @post('/employees/test')
  // async createEmployeeTest(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(EmployeeRequest),
  //       },
  //     },
  //     required: true,
  //   })
  //   employee: EmployeeRequest,
  // ): Promise<ApiResponse> {
  //   const apiResponce: ApiResponse = new ApiResponse();
  //   if (employee.age < 18) {
  //     apiResponce.status = 'Error';
  //     apiResponce.statusCode = 500;
  //     apiResponce.message =
  //       'Unable to create new employee. Employee age must be above 18.';
  //     return apiResponce;
  //   } else {
  //     const emp = await this.employeeRepository.create(employee);
  //     if (emp !== undefined || null) {
  //       apiResponce.status = 'success';
  //       apiResponce.statusCode = 200;
  //       apiResponce.data = emp;
  //       return apiResponce;
  //     } else {
  //       apiResponce.status = 'error';
  //       apiResponce.statusCode = 500;
  //       apiResponce.message = 'Unable to create new employee. Server Error';
  //       return apiResponce;
  //     }
  //   }
  // }
}
