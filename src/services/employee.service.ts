import {BindingScope, injectable, service} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Response} from '@loopback/rest';
import {Employee, EmployeeRequest} from '../models';
import {EmployeeRepository} from '../repositories';
import {CommonService} from './common.service';

@injectable({scope: BindingScope.TRANSIENT})
export class EmployeeService {
  constructor(
    @repository(EmployeeRepository)
    private employeeRepository: EmployeeRepository,
    @service(CommonService) private commonService: CommonService,
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
}
