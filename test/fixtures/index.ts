export const CSV_PROCESSOR_ENDPOINT = 'csv/upload';
export const generateCarByUuidEnpoind = (uuid: string) => `/car/${uuid}`;

export const SUBSET_COLUMNS = {
  uuid: '101050',
  vin: '1HGBXTD845TDERSTG',
  make: 'Toyota',
  model: 'camry',
  price: 5000,
  zipCode: 94404,
  createdate: '20/10/2019',
};

export const ALL_COLUMNS = {
  uuid: '101050',
  vin: '1HGBXTD845TDERSTG',
  make: 'Toyota',
  model: 'camry',
  mileage: 5001,
  year: 2002,
  price: 5000,
  zipCode: 94404,
  createdate: '20/10/2019',
  updatedate: '05/11/2019',
};

export const EXTRA_COLUMNS = {
  uuid: '101050',
  vin: '1HGBXTD845TDERSTG',
  make: 'Toyota',
  model: 'camry',
  mileage: 5001,
  year: 2002,
  price: 5000,
  doors: 4,
  zipCode: 94404,
  createdate: '20/10/2019',
  updatedate: '05/11/2019',
  color: 'Black',
};