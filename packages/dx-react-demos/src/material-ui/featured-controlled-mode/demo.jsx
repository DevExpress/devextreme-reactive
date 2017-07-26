import React from 'react';
import PropTypes from 'prop-types';
import {
  SortingState, EditingState, PagingState,
  LocalPaging, LocalSorting,
  ColumnOrderState,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  TableView, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropContext,
  DropDownMenu,
} from '@devexpress/dx-react-grid-material-ui';
import {
  TableCell,
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui';

import DeleteIcon from 'material-ui-icons/Delete';
import EditIcon from 'material-ui-icons/Edit';
import SaveIcon from 'material-ui-icons/Save';
import CancelIcon from 'material-ui-icons/Cancel';

import { withStyles, createStyleSheet } from 'material-ui/styles';

import {
    ProgressBarCell,
} from '../templates/progress-bar-cell';
import {
    HighlightedCell,
} from '../templates/highlighted-cell';

import {
  generateRows,
  globalSalesValues,
} from '../../demo-data/generator';

const styleSheet = createStyleSheet('ControlledModeDemo', theme => ({
  commandButton: {
    minWidth: '40px',
  },
  lookupEditCell: {
    verticalAlign: 'middle',
    paddingRight: theme.spacing.unit,
    '& ~ $lookupEditCell': {
      paddingLeft: theme.spacing.unit,
    },
  },
  dialog: {
    width: 'calc(100% - 16px)',
  },
}));

const commandTemplates = {
  add: (onClick, allowAdding) => (
    <div style={{ textAlign: 'center' }}>
      <Button
        color="primary"
        onClick={onClick}
        title="Create new row"
        disabled={!allowAdding}
      >
        New
      </Button>
    </div>
  ),
  edit: onClick => (
    <IconButton onClick={onClick} title="Edit row">
      <EditIcon />
    </IconButton>
  ),
  delete: onClick => (
    <IconButton onClick={onClick} title="Delete row">
      <DeleteIcon />
    </IconButton>
  ),
  commit: onClick => (
    <IconButton onClick={onClick} title="Save changes">
      <SaveIcon />
    </IconButton>
  ),
  cancel: onClick => (
    <IconButton color="accent" onClick={onClick} title="Cancel changes">
      <CancelIcon />
    </IconButton>
  ),
};

const LookupEditCellBase = (({ value, onValueChange, availableValues, classes }) => (
  <TableCell
    className={classes.lookupEditCell}
  >
    <DropDownMenu
      onItemClick={newValue => onValueChange(newValue)}
      defaultTitle={value}
      items={availableValues}
    />
  </TableCell>
));
LookupEditCellBase.propTypes = {
  value: PropTypes.any,
  onValueChange: PropTypes.func.isRequired,
  availableValues: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};
LookupEditCellBase.defaultProps = {
  value: undefined,
};

export const LookupEditCell = withStyles(styleSheet)(LookupEditCellBase);

const availableValues = {
  product: globalSalesValues.product,
  region: globalSalesValues.region,
  customer: globalSalesValues.customer,
};

class DemoBase extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { name: 'product', title: 'Product' },
        { name: 'region', title: 'Region', width: 110 },
        { name: 'amount', title: 'Amount', align: 'right', width: 90 },
        { name: 'discount', title: 'Discount', width: 110 },
        { name: 'saleDate', title: 'Sale Date' },
        { name: 'customer', title: 'Customer' },
      ],
      rows: generateRows({
        columnValues: { id: ({ index }) => index, ...globalSalesValues },
        length: 200,
      }),
      sorting: [],
      editingRows: [],
      addedRows: [],
      changedRows: {},
      currentPage: 0,
      deletingRows: [],
      pageSize: 10,
      allowedPageSizes: [5, 10, 15],
      columnOrder: ['product', 'region', 'amount', 'discount', 'saleDate', 'customer'],
    };

    this.changeSorting = sorting => this.setState({ sorting });
    this.changeEditingRows = editingRows => this.setState({ editingRows });
    this.changeAddedRows = addedRows => this.setState({
      addedRows: addedRows.map(row => (Object.keys(row).length ? row : {
        amount: 0,
        discount: 0,
        saleDate: new Date().toISOString().split('T')[0],
        product: availableValues.product[0],
        region: availableValues.region[0],
        customer: availableValues.customer[0],
      })),
    });
    this.changeChangedRows = changedRows => this.setState({ changedRows });
    this.changeFilters = filters => this.setState({ filters });
    this.changeCurrentPage = currentPage => this.setState({ currentPage });
    this.changePageSize = pageSize => this.setState({ pageSize });
    this.commitChanges = ({ added, changed, deleted }) => {
      let rows = this.state.rows.slice();
      if (added) {
        rows = [
          ...added.map((row, index) => ({
            id: rows.length + index,
            ...row,
          })),
          ...rows,
        ];
        this.setState({ rows });
      }
      if (changed) {
        Object.keys(changed).forEach((key) => {
          const index = rows.findIndex(row => String(row.id) === key);
          if (index > -1) {
            const change = changed[key];
            rows[index] = Object.assign({}, rows[index], change);
          }
        });
        this.setState({ rows });
      }
      if (deleted) {
        this.setState({ deletingRows: deleted });
      }
    };
    this.cancelDelete = () => this.setState({ deletingRows: [] });
    this.deleteRows = () => {
      const rows = this.state.rows.slice();
      this.state.deletingRows.forEach((rowId) => {
        const index = rows.findIndex(row => row.id === rowId);
        if (index > -1) {
          rows.splice(index, 1);
        }
      });
      this.setState({ rows, deletingRows: [] });
    };
    this.changeColumnOrder = (order) => {
      this.setState({ columnOrder: order });
    };

    this.tableCellTemplate = ({ row, column, style }) => {
      if (column.name === 'discount') {
        return (
          <ProgressBarCell value={row.discount * 100} style={style} />
        );
      } else if (column.name === 'amount') {
        return (
          <HighlightedCell align={column.align} value={row.amount} style={style} />
        );
      }
      return undefined;
    };
  }
  render() {
    const {
      classes,
    } = this.props;
    const {
      rows,
      columns,
      sorting,
      editingRows,
      addedRows,
      changedRows,
      currentPage,
      deletingRows,
      pageSize,
      allowedPageSizes,
      columnOrder,
    } = this.state;

    return (
      <div>
        <Grid
          rows={rows}
          columns={columns}
          getRowId={row => row.id}
        >
          <ColumnOrderState
            order={columnOrder}
            onOrderChange={this.changeColumnOrder}
          />

          <SortingState
            sorting={sorting}
            onSortingChange={this.changeSorting}
          />
          <PagingState
            currentPage={currentPage}
            onCurrentPageChange={this.changeCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={this.changePageSize}
          />

          <LocalSorting />
          <LocalPaging />

          <EditingState
            editingRows={editingRows}
            onEditingRowsChange={this.changeEditingRows}
            changedRows={changedRows}
            onChangedRowsChange={this.changeChangedRows}
            addedRows={addedRows}
            onAddedRowsChange={this.changeAddedRows}
            onCommitChanges={this.commitChanges}
          />

          <DragDropContext />

          <TableView
            tableCellTemplate={this.tableCellTemplate}
            allowColumnReordering
          />

          <TableHeaderRow allowSorting allowDragging />
          <TableEditRow
            editCellTemplate={(props) => {
              const { column } = props;
              const columnValues = availableValues[column.name];
              if (columnValues) {
                return <LookupEditCell {...props} availableValues={columnValues} />;
              }
              return undefined;
            }}
          />
          <TableEditColumn
            width={120}
            allowAdding
            allowEditing
            allowDeleting
            commandTemplate={({ executeCommand, id }) => {
              const template = commandTemplates[id];
              if (template) {
                const allowAdding = !this.state.addedRows.length;
                const onClick = (e) => {
                  executeCommand();
                  e.stopPropagation();
                };
                return template(
                  onClick,
                  allowAdding,
                );
              }
              return undefined;
            }}
          />
          <PagingPanel
            allowedPageSizes={allowedPageSizes}
          />
        </Grid>

        <Dialog
          open={!!deletingRows.length}
          onRequestClose={this.cancelDelete}
          classes={{ paper: classes.dialog }}
        >
          <DialogTitle>Delete Row</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure to delete the following row?
            </DialogContentText>
            <Grid
              rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
              columns={columns}
            >
              <TableView
                tableCellTemplate={this.tableCellTemplate}
              />
              <TableHeaderRow />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
            <Button onClick={this.deleteRows} color="accent">Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

DemoBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(DemoBase);
