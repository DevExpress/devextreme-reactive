const columnValues = {
  name: ['Bob', 'Alberta', 'Robert', 'Jane', 'Azbest', 'Vova', 'Sonya', 'Marry', 'Sherlock'],
  sex: ['Male', 'Female'],
  city: ['Moscow', 'New York', 'Los Angeles', 'Tula'],
  car: ['Mercedes', 'Audi', 'BMW', 'Porshe', 'Range Rover'],
};

export function generateColumns() {
  const columns = [{ name: 'id', title: 'ID', width: 120, resizable: false }];

  Object.keys(columnValues).forEach((column) => {
    columns.push({
      name: column,
      title: column[0].toUpperCase() + column.slice(1),
      minWidth: 80,
      maxWidth: 250,
    });
  });

  return columns;
}

export function generateRows(length) {
  const data = [];
  const columns = Object.keys(columnValues);

  for (let i = 0; i < length; i += 1) {
    const record = { id: i };

    columns.forEach((column) => {
      const items = columnValues[column];
      record[column] = items[Math.floor(Math.random() * items.length)];
    });

    data.push(record);
  }

  return data;
}
