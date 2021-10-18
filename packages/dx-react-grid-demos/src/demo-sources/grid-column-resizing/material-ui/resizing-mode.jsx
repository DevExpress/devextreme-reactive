import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import withStyles from '@mui/styles/withStyles';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import GridMUI from '@mui/material/Grid';
import Button from '@mui/material/Button';
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
    paddingLeft: '8px',
    fontSize: '14px',
    width: '88px',
  },
  label: {
    fontSize: '14px',
  },
  container: {
    maxWidth: '19em',
  },
  button: {
    fontSize: '14px',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '32px',
  },
  selector: {
    height: '32px',
  },
});

// #FOLD_BLOCK
const ModeSelectorBase = (props) => {
  const { defaultValue, changeMode, classes } = props;
  return (
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
            margin="dense"
          />
        )}
      >
        <MenuItem value="widget">Widget</MenuItem>
        <MenuItem value="nextColumn">NextColumn</MenuItem>
      </Select>
    </GridMUI>
  );
};
const ModeSelector = withStyles(styles, { name: 'ModeSelector' })(ModeSelectorBase);

// #FOLD_BLOCK
const ResetWidthButtonBase = (props) => {
  const { resetWidths, classes } = props;
  return (
    <Button
      onClick={resetWidths}
      variant="outlined"
      size="medium"
      className={classes.button}
    >
      Reset widths to default
    </Button>
  );
};
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
    <Paper>
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
    </Paper>
  );
};
