import { Service, Inject } from '@tsed/di';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';
import { CarModel } from '../model/CarModel';
import { MongooseModel } from '@tsed/mongoose';
import { parseDate } from '../config/date-utils';
import { CsvColumns } from '../config/columns';

@Service()
export class CsvProcessorService {
  @Inject(CarModel)
  private CarModel: MongooseModel<CarModel>;

  readCsvAndSaveCarData(filePath: string, directory: string, fileName: string) {
    let index = 0;
    let newCars: CarModel[] = [];
    fs.createReadStream(path.resolve(directory, fileName))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => console.error(error))
      .on('data', (row) => {
        // only add if uuid present
        if (row[CsvColumns.Uuid]) {
          newCars.push(this.parseCarData(row));
        }
        // save in bulk every 500 entries
        if (index % 500 == 0) {
          this.saveCarsInBulk(newCars);
          newCars = [];
        }
        index++;
      })
      .on('end', (rowCount: number) => {
        // save in bulk if there is any remaining entry
        if (newCars.length) {
          this.saveCarsInBulk(newCars);
          newCars = [];
        }
        fs.unlinkSync(filePath);
      });
  }

  parseCarData(row: any): CarModel {
    const uuid = row[CsvColumns.Uuid];
    const vin = row[CsvColumns.Vin];
    const make = row[CsvColumns.Make];
    const model = row[CsvColumns.Model];
    const mileage = row[CsvColumns.Mileage];
    const year = row[CsvColumns.Year];
    const price = row[CsvColumns.Price];
    const zipCode = row[CsvColumns.ZipCode];
    const createDate = row[CsvColumns.CreateDate];
    const updateDate = row[CsvColumns.UpdateDate];

    const carModel: CarModel = {
      uuid: uuid,
    };

    if (vin) {
      carModel.vin = vin;
    }

    if (make) {
      carModel.make = make;
    }

    if (model) {
      carModel.model = model;
    }

    if (mileage) {
      carModel.mileage = parseFloat(mileage);
    }

    if (year) {
      carModel.year = parseFloat(year);
    }

    if (price) {
      carModel.price = parseFloat(price);
    }

    if (zipCode) {
      carModel.zipCode = parseFloat(zipCode);
    }

    if (createDate) {
      carModel.createDate = parseDate(createDate);
    }

    if (updateDate) {
      carModel.updateDate = parseDate(updateDate);
    }
    return carModel;
  }

  saveCarsInBulk(cars: CarModel[]) {
    this.CarModel.bulkWrite(
      cars.map((car) => ({
        updateOne: {
          filter: { uuid: car.uuid },
          update: { $set: car },
          upsert: true,
        },
      }))
    );
  }
}
