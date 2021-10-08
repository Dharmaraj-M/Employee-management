import {Model, model, property} from '@loopback/repository';

@model()
export class EmployeeRequest extends Model {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  age: number;

  constructor(data?: Partial<EmployeeRequest>) {
    super(data);
  }
}

export interface EmployeeRequestRelations {
  // describe navigational properties here
}

export type EmployeeRequestWithRelations = EmployeeRequest &
  EmployeeRequestRelations;
