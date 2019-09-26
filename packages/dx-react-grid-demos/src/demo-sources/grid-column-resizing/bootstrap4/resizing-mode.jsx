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

// #FOLD_BLOCK
const ModeSelector = (props) => {
  const { defaultValue, changeMode } = props;
  return (
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
};

// #FOLD_BLOCK
const ResetWidthButton = (props) => {
  const { resetWidths } = props;
  return (
    <button
      type="button"
      onClick={resetWidths}
      className="btn btn-sm"
      style={{
        paddingLeft: '8px',
        paddingRight: '8px',
        height: '2em',
        width: 'auto',
        fontSize: '1em',
      }}
    >
      Reset widths to default
    </button>
  );
};

const ResizingPanel = props => (
  <Plugin name="ResizingPanel">
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
    { name: 'gender', title: 'Gender' },
    { name: 'city', title: 'City' },
    { name: 'car', title: 'Car' },
  ]);
  const [rows] = useState(generateRows({ length: 6 }));
  const [defaultColumnWidths] = useState([
    { columnName: 'name', width: 180 },
    { columnName: 'gender', width: 180 },
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
          resizingMode={resizingMode}
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
