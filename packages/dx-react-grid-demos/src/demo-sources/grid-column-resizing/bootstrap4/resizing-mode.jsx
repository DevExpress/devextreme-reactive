import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  Toolbar,
} from '@devexpress/dx-react-grid-bootstrap4';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { generateRows } from '../../../demo-data/generator';

const ResizingModeChanger = ({ defaultValue, changeMode }) => (
  <Plugin name="ResizingModeChanger">
    <Template name="toolbarContent">
      <div>
        {'Column Resizing Mode:'}
        &nbsp;
        <select
          defaultValue={defaultValue}
          onChange={e => changeMode(e.target.value)}
          className="dropdown"
        >
          <option value="widget">Widget</option>
          <option value="nextColumn">NextColumn</option>
        </select>
      </div>
      <TemplatePlaceholder />
    </Template>
  </Plugin>
);

export default () => {
  const [columns] = useState([
    { name: 'name', title: 'Name' },
    { name: 'sex', title: 'Sex' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [rows] = useState(generateRows({ length: 6 }));
  const [defaultColumnWidths] = useState([
    { columnName: 'name', width: 180 },
    { columnName: 'sex', width: 180 },
    { columnName: 'city', width: 180 },
    { columnName: 'car', width: 240 },
  ]);
  const [resizingMode, setResizingMode] = useState('widget');

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table />
        <TableColumnResizing
          defaultColumnWidths={defaultColumnWidths}
          columnResizingMode={resizingMode}
        />
        <TableHeaderRow />
        <Toolbar />
        <ResizingModeChanger
          defaultValue={resizingMode}
          changeMode={setResizingMode}
        />
      </Grid>
    </div>
  );
};
