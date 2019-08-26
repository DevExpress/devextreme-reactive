import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GridMUI from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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

const styles = () => ({
  input: {
    fontSize: '14px',
    width: '90px',
  },
  label: {
    fontSize: '14px',
  },
  container: {
    maxWidth: '18em',
  },
  button: {
    fontSize: '14px',
    height: '32px',
  },
  selector: {
    height: '32px',
  },
});

const ModeSelectorBase = ({ defaultValue, changeMode, classes }) => (
  <GridMUI
    container
    alignItems="center"
    className={classes.container}
  >
    <Typography
      className={classes.label}
    >
      Column Resizing Mode:
      &nbsp;
    </Typography>
    <Select
      onChange={e => changeMode(e.target.value)}
      value={defaultValue}
      className={classes.selector}
      input={(
        <OutlinedInput
          classes={{ input: classes.input }}
          labelWidth={0}
          margin="dense"
        />
      )}
    >
      <MenuItem value="widget">Widget</MenuItem>
      <MenuItem value="nextColumn">NextColumn</MenuItem>
    </Select>
  </GridMUI>
);

const ModeSelector = withStyles(styles, { name: 'ModeSelector' })(ModeSelectorBase);

const ResetWidthButtonBase = ({ resetWidths, classes }) => (
  <Button
    onClick={resetWidths}
    variant="outlined"
    size="medium"
    className={classes.button}
  >
    Reset widths to default
  </Button>
);

const ResetWidthButton = withStyles(styles, { name: 'ResetWidthButton' })(ResetWidthButtonBase);

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
    <Paper>
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
    </Paper>
  );
};
