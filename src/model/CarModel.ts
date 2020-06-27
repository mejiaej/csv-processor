import { Property, IgnoreProperty } from '@tsed/common';
import { Model, ObjectID, Unique } from '@tsed/mongoose';

@Model({ name: 'car' })
export class CarModel {

  @Unique()
  @Property('uuid')
  uuid: string;

  @Property()
  vin?: string;

  @Property()
  make?: string;

  @Property()
  model?: string;

  @Property()
  mileage?: number;

  @Property()
  year?: number;

  @Property()
  price?: number;

  @Property()
  zipCode?: number;

  @Property()
  createDate?: Date;

  @Property()
  updateDate?: Date;
}
