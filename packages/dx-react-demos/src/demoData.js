import randomSeed from './random';

const defaultColumnValues = {
  sex: ['Male', 'Female'],
  name: [
    'sex',
    {
      Male: ['James', 'John', 'Robert', 'William', 'David', 'Richard', 'Thomas', 'Paul', 'Mark'],
      Female: ['Mary', 'Linda', 'Barbara', 'Maria', 'Lisa', 'Nancy', 'Betty', 'Sandra', 'Sharon'],
    },
  ],
  city: ['New York', 'Los Angeles', 'Chicago', 'Las Vegas', 'Austin', 'Tokyo', 'Rio de Janeiro', 'London', 'Paris'],
  car: ['Honda Civic', 'Toyota Corolla', 'Chevrolet Cruze', 'Honda Accord', 'Nissan Altima', 'Kia Optima', 'Audi A4', 'BMW 750'],
};

export const globalSalesValues = {
  region: ['Asia', 'Europe', 'North America', 'South America', 'Australia', 'Africa'],
  sector: ['Energy', 'Health', 'Manufacturing', 'Insurance', 'Banking', 'Telecom'],
  channel: ['Resellers', 'Retail', 'VARs', 'Consultants', 'Direct', 'Telecom'],
  units: random => Math.floor(random() * 4) + 1,
  customer: [
    'Renewable Supplies', 'Energy Systems', 'Environment Solar', 'Beacon Systems', 'Apollo Inc',
    'Gemini Stores', 'McCord Builders', 'Building M Inc', 'Beacon Systems', 'Global Services',
    'Market Eco', 'Johnson & Assoc', 'Get Solar Inc', 'Supply Warehouse', 'Discovery Systems', 'Mercury Solar'],
  product: ['SolarMax', 'SolarMax', 'SolarOne', 'EnviroCare', 'EnviroCare Max'],
  amount: random => Math.floor(random() * 10000) + 1000,
  discount: random => Math.round(random() * 0.5 * 1000) / 1000,
  saleDate: (random) => {
    const dateValue = Date.UTC(2016, Math.floor(random() * 3) + 1, Math.floor(random() * 30) + 1);
    const date = new Date(dateValue);
    return date.toDateString();
  },
};

export function generateColumns({ columnValues = defaultColumnValues } = {}) {
  const columns = [{ name: 'id', title: 'ID', width: 120, resize: false }];

  Object.keys(columnValues).forEach((column) => {
    columns.push({
      name: column,
      title: column[0].toUpperCase() + column.slice(1),
    });
  });

  return columns;
}

export function generateRows({ columnValues = defaultColumnValues, length } = {}) {
  const random = randomSeed(329972281);

  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = { id: i };

    columns.forEach((column) => {
      let items = columnValues[column];

      if (typeof items === 'function') {
        record[column] = items(random);
        return;
      }

      while (items.length === 2 && typeof items[1] === 'object') {
        items = items[1][record[items[0]]];
      }

      record[column] = items[Math.floor(random() * items.length)];
    });

    data.push(record);
  }

  return data;
}
