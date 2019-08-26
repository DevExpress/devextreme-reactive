import React, { useState } from 'react';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  Toolbar,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { generateRows } from '../../../demo-data/generator';

const ModeSelector = ({ defaultValue, changeMode }) => (
  <div>
    {'Column Resizing Mode:'}
    &nbsp;
    <select
      defaultValue={defaultValue}
      onChange={e => changeMode(e.target.value)}
      className="dropdown"
      style={{
        height: '2em',
      }}
    >
      <option value="widget">Widget</option>
      <option value="nextColumn">NextColumn</option>
    </select>
  </div>
);

const ResetWidthButton = ({ resetWidths }) => (
  <button
    type="button"
    onClick={resetWidths}
    className="btn btn-sm"
    style={{
      padding: '0em 1em',
      height: '2em',
      width: 'auto',
      fontSize: '1em',
    }}
  >
    RESET WIDTHS TO DEFAULT
  </button>
);

const ResizingPanel = props => (
  <Plugin name="ResizingModeChanger">
    <Template name="toolbarContent">
      <ResetWidthButton {...props} />
      <TemplatePlaceholder />
      <ModeSelector {...props} />
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
  const [columnWidths, setColumnWidths] = useState(defaultColumnWidths);
  const [resizingMode, setResizingMode] = useState('widget');

  const resetWidths = () => {
    setColumnWidths(defaultColumnWidths);
  };

  return (
    <div className="card">
      <Grid
        rows={rows}
        columns={columns}
      >
        <Table />
        <TableColumnResizing
          columnWidths={columnWidths}
          onColumnWidthsChange={setColumnWidths}
          columnResizingMode={resizingMode}
        />
        <TableHeaderRow />
        <Toolbar />
        <ResizingPanel
          defaultValue={resizingMode}
          changeMode={setResizingMode}
          resetWidths={resetWidths}
        />
      </Grid>
    </div>
  );
};
