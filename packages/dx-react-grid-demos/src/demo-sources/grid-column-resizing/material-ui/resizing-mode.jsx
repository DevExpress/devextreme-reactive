import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
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

const PREFIX = 'Demo';
const classes = {
  input: `${PREFIX}-input`,
  label: `${PREFIX}-label`,
  container: `${PREFIX}-container`,
  button: `${PREFIX}-button`,
  selector: `${PREFIX}-selector`,
};
const StyledGridMUI = styled(GridMUI)(() => ({
  [`&.${classes.container}`]: {
    maxWidth: '19em',
  },
  [`& .${classes.input}`]: {
    paddingLeft: '8px',
    fontSize: '14px',
    width: '88px',
  },
  [`& .${classes.label}`]: {
    fontSize: '14px',
  },
  [`& .${classes.selector}`]: {
    height: '32px',
  },
}));
const StyledButton = styled(Button)(() => ({
  [`&.${classes.button}`]: {
    fontSize: '14px',
    paddingLeft: '8px',
    paddingRight: '8px',
    height: '32px',
  },
}));

// #FOLD_BLOCK
const ModeSelector = (props) => {
  const { defaultValue, changeMode } = props;
  return (
    <StyledGridMUI
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
    </StyledGridMUI>
  );
};

// #FOLD_BLOCK
const ResetWidthButton = (props) => {
  const { resetWidths } = props;
  return (
    <StyledButton
      onClick={resetWidths}
      variant="outlined"
      size="medium"
      className={classes.button}
    >
      Reset widths to default
    </StyledButton>
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
