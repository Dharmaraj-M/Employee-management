import {Entity, model, property} from '@loopback/repository';

@model()
export class Employee extends Entity {

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
