import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {EmployeeDbDataSource} from '../datasources';
import {Employee, EmployeeRelations} from '../models';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.employeeId,
  EmployeeRelations
> {
  constructor(
    @inject('datasources.Employee_DB') dataSource: EmployeeDbDataSource,
  ) {
    super(Employee, dataSource);
  }
}
