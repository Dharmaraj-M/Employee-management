import {Model, model, property} from '@loopback/repository';

@model()
export class ApiResponse extends Model {
  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  statusCode: number;

  @property({
    type: 'object',
    required: true,
  })
  data: object;

  @property({
    type: 'string',
  })
  message?: string;

  constructor(data?: Partial<ApiResponse>) {
    super(data);
  }
}

export interface ApiResponseRelations {
  // describe navigational properties here
}

export type ApiResponseWithRelations = ApiResponse & ApiResponseRelations;
