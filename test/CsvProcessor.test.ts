import { PlatformTest } from '@tsed/common';
import * as SuperTest from 'supertest';
import { Server } from '../src/Server';
import {
  CSV_PROCESSOR_ENDPOINT,
  SUBSET_COLUMNS,
  ALL_COLUMNS,
  EXTRA_COLUMNS,
} from './fixtures';
import { CsvProcessorService } from '../src/service/CsvProcessorService';
import { CarModel } from '../src/model/CarModel';
import { parseDate } from '../src/config/date-utils';

describe('CsvProcessor', () => {
  // bootstrap your Server to load all endpoints before run your test
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeAll(PlatformTest.bootstrap(Server));
  beforeAll(() => {
    request = SuperTest(PlatformTest.callback());
  });
  afterAll(PlatformTest.reset);

  describe('upload csv', () => {
    it('uploads subset', () => {
      const filePath = `${__dirname}/csv/test-small-subset.csv`;
      request.post(CSV_PROCESSOR_ENDPOINT).attach('file', filePath).expect(202);
    });

    it('uploads small csv', () => {
      const filePath = `${__dirname}/csv/test-small.csv`;
      request.post(CSV_PROCESSOR_ENDPOINT).attach('file', filePath).expect(202);
    });
    it('uploads small csv with additional columns', () => {
      const filePath = `${__dirname}/csv/test-small-additional-columns.csv`;
      request.post(CSV_PROCESSOR_ENDPOINT).attach('file', filePath).expect(202);
    });

    it('uploads large csv', () => {
      const filePath = `${__dirname}/csv/test-large.csv`;
      request.post(CSV_PROCESSOR_ENDPOINT).attach('file', filePath).expect(202);
    });
  });

  describe('test csv parser', () => {
    it('parses subset columns', () => {
      const service = new CsvProcessorService();
      const parsedData: CarModel = service.parseCarData(SUBSET_COLUMNS);
      expect(parsedData.uuid).toEqual(SUBSET_COLUMNS.uuid);
      expect(parsedData.vin).toEqual(SUBSET_COLUMNS.vin);
      expect(parsedData.make).toEqual(SUBSET_COLUMNS.make);
      expect(parsedData.model).toEqual(SUBSET_COLUMNS.model);
      expect(parsedData).not.toHaveProperty('mileage');
      expect(parsedData).not.toHaveProperty('year');
      expect(parsedData.price).toEqual(SUBSET_COLUMNS.price);
      expect(parsedData.zipCode).toEqual(SUBSET_COLUMNS.zipCode);
      expect(parsedData.createDate).toEqual(
        parseDate(SUBSET_COLUMNS.createdate)
      );
      expect(parsedData).not.toHaveProperty('updateDate');
    });

    it('parses all columns', () => {
      const service = new CsvProcessorService();
      const parsedData: CarModel = service.parseCarData(ALL_COLUMNS);
      expect(parsedData.uuid).toEqual(ALL_COLUMNS.uuid);
      expect(parsedData.vin).toEqual(ALL_COLUMNS.vin);
      expect(parsedData.make).toEqual(ALL_COLUMNS.make);
      expect(parsedData.model).toEqual(ALL_COLUMNS.model);
      expect(parsedData.mileage).toEqual(ALL_COLUMNS.mileage);
      expect(parsedData.year).toEqual(ALL_COLUMNS.year);
      expect(parsedData.price).toEqual(ALL_COLUMNS.price);
      expect(parsedData.zipCode).toEqual(ALL_COLUMNS.zipCode);
      expect(parsedData.createDate).toEqual(parseDate(ALL_COLUMNS.createdate));
      expect(parsedData.updateDate).toEqual(parseDate(ALL_COLUMNS.updatedate));
    });

    it('parses extra columns', () => {
      const service = new CsvProcessorService();
      const parsedData: CarModel = service.parseCarData(EXTRA_COLUMNS);
      expect(parsedData.uuid).toEqual(EXTRA_COLUMNS.uuid);
      expect(parsedData.vin).toEqual(EXTRA_COLUMNS.vin);
      expect(parsedData.make).toEqual(EXTRA_COLUMNS.make);
      expect(parsedData.model).toEqual(EXTRA_COLUMNS.model);
      expect(parsedData.mileage).toEqual(EXTRA_COLUMNS.mileage);
      expect(parsedData.year).toEqual(EXTRA_COLUMNS.year);
      expect(parsedData.price).toEqual(EXTRA_COLUMNS.price);
      expect(parsedData.zipCode).toEqual(EXTRA_COLUMNS.zipCode);
      expect(parsedData.createDate).toEqual(
        parseDate(EXTRA_COLUMNS.createdate)
      );
      expect(parsedData.updateDate).toEqual(
        parseDate(EXTRA_COLUMNS.updatedate)
      );
      expect(parsedData).not.toHaveProperty('color');
      expect(parsedData).not.toHaveProperty('doors');
    });
  });
});
