import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { EditingState } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableInlineCellEditing,
  Toolbar,
} from '@devexpress/dx-react-grid-bootstrap3';
import {
  Plugin,
  Template,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';

import {
  generateRows,
  defaultColumnValues,
} from '../../../demo-data/generator';

const getRowId = row => row.id;

// #FOLD_BLOCK
const StartEditActionSelector = (props) => {
  const { defaultAction, changeAction } = props;
  return (
    <div>
      {'Start Edit Action:'}
      &nbsp;
      <select
        defaultValue={defaultAction}
        onChange={e => changeAction(e.target.value)}
        className="dropdown"
      >
        <option value="click">Click</option>
        <option value="doubleClick">Double Click</option>
      </select>
    </div>
  );
};

// #FOLD_BLOCK
const SelectTextChecker = (props) => {
  const { isSelectText, changeSelectText } = props;
  return (
    <div
      className="checkbox"
    >
      <label
        htmlFor="selectTextChecker"
      >
        <input
          type="checkbox"
          checked={isSelectText}
          id="selectTextChecker"
          name="selectTextChecker"
          onChange={e => changeSelectText(e.target.checked)}
        />
        Select Text On Focus
      </label>
    </div>
  );
};

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
