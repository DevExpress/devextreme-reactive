import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import GridMUI from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableInlineCellEditing,
  Toolbar,
} from '@devexpress/dx-react-grid-material-ui';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import {
  generateRows,
  defaultColumnValues,
} from '../../../demo-data/generator';

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
  selector: {
    height: '32px',
  },
});

const getRowId = row => row.id;

// #FOLD_BLOCK
const StartEditActionSelectorBase = (props) => {
  const { defaultAction, changeAction, classes } = props;
  return (
    <GridMUI
      container
      alignItems="center"
      className={classes.container}
    >
      <Typography
        className={classes.label}
      >
        Start Edit Action:
        &nbsp;
      </Typography>
      <Select
        onChange={e => changeAction(e.target.value)}
        value={defaultAction}
        className={classes.selector}
        input={(
          <OutlinedInput
            classes={{ input: classes.input }}
            labelWidth={0}
            margin="dense"
          />
        )}
      >
        <MenuItem value="click">Click</MenuItem>
        <MenuItem value="doubleClick">Double Click</MenuItem>
      </Select>
    </GridMUI>
  );
};
const StartEditActionSelector = withStyles(styles, { name: 'StartEditActionSelector' })(StartEditActionSelectorBase);

// #FOLD_BLOCK
const SelectTextCheckerBase = (props) => {
  const { isSelectText, changeSelectText, classes } = props;
  return (
    <FormControlLabel
      control={(
        <Checkbox
          checked={isSelectText}
          onChange={e => changeSelectText(e.target.checked)}
          color="primary"
        />
      )}
      classes={{ label: classes.label }}
      label="Select Text On Focus"
    />
  );
};
const SelectTextChecker = withStyles(styles, { name: 'SelectTextChecker' })(SelectTextCheckerBase);

const EditPropsPanel = props => (
  <Plugin name="EditPropsPanel">
    <Template name="toolbarContent">
      <SelectTextChecker {...props} />
      <TemplatePlaceholder />
      <StartEditActionSelector {...props} />
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
  const [rows, setRows] = useState(generateRows({
    columnValues: { id: ({ index }) => index, ...defaultColumnValues },
    length: 8,
  }));
  const [startEditAction, setStartEditAction] = useState('click');
  const [selectTextOnEditStart, setSelectTextOnEditStart] = useState(true);

  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId = rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...rows,
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
      ];
    }
    if (changed) {
      changedRows = rows.map(row => (changed[row.id] ? { ...row, ...changed[row.id] } : row));
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter(row => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  return (
    <Paper>
      <Grid
        rows={rows}
        columns={columns}
        getRowId={getRowId}
      >
        <EditingState onCommitChanges={commitChanges} />
        <Table />
        <TableHeaderRow />
        <Toolbar />
        <EditPropsPanel
          defaultAction={startEditAction}
          changeAction={setStartEditAction}
          isSelectText={selectTextOnEditStart}
          changeSelectText={setSelectTextOnEditStart}
        />
        <TableInlineCellEditing
          startEditAction={startEditAction}
          selectTextOnEditStart={selectTextOnEditStart}
        />
      </Grid>
    </Paper>
  );
};
