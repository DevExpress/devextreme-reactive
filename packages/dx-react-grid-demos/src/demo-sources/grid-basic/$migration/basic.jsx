import React, { useState } from 'react';

import {
  DataGrid,
  Column,
} from 'devextreme-react/data-grid';

import 'devextreme/dist/css/dx.light.css';

import {
  generateRows,
  globalSalesValues,
} from '../../../demo-data/generator';

export default () => {
  const [columns] = useState([
    { name: 'region', title: 'Region' },
    { name: 'sector', title: 'Sector' },
    { name: 'customer', title: 'Customer' },
    { name: 'product', title: 'Product' },
    { name: 'amount', title: 'Sale Amount' },
  ]);
  const [rows] = useState(generateRows({ columnValues: globalSalesValues, length: 8 }));

  return (
    <div className="card">
      <DataGrid dataSource={rows}>
        {
          columns.map((column) => (
            <Column
              key={column.name}
              dataField={column.name}
              caption={column.title}
            >
            </Column>
          ))
        }
      </DataGrid>
    </div>
  );
};