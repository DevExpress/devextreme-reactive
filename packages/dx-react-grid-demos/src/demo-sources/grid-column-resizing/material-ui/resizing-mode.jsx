import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableColumnResizing,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import { generateRows } from '../../../demo-data/generator';
import { Select, MenuItem, Typography } from '@material-ui/core';
import GridMUI from '@material-ui/core/Grid';

const styles = theme => ({
  select: {
    border: 'none',
  },
  input: {
    fontSize: '14px',
  },
  label: {
    fontSize: '14px',
  },
});

const ModeSelectorBase = ({ defaultValue, changeMode, classes}) => (
  <GridMUI 
    container
    direction="row"
    justify="flex-start"
    alignItems="center"
  >
    <Typography 
      className={classes.label}
    >
      Column Resizing Mode:
      &nbsp;
    </Typography>
    <Select
      className={classes.select}
      onChange={e => changeMode(e.target.value)}
      value={defaultValue}
      input={
        <OutlinedInput
          classes={{ input: classes.input }}
          labelWidth={0}
          margin='dense'
        />
      }
    >
      <MenuItem value="widget">Widget</MenuItem>
      <MenuItem value="nextColumn">NextColumn</MenuItem>
    </Select>
  </GridMUI>
)

const ModeSelector = withStyles(styles, { name: 'ModeSelector' })(ModeSelectorBase);

const ResizingModeChanger = (props) => (
  <Plugin name="ResizingModeChanger">
    <Template name="toolbarContent">
      <ModeSelector {...props} />
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
    <Paper>
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
    </Paper>
  );
};
