import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
  TemplateConnector,
} from '@devexpress/dx-react-core';
import {
  FIXED_COLUMN_BEFORE_SIDE,
  FIXED_COLUMN_AFTER_SIDE,
  isFixedTableRow,
  getFixedColumnKeys,
  tableColumnsWithFixed,
  tableHeaderRowsWithFixed,
} from '@devexpress/dx-grid-core';

const tableHeaderRowsComputed = ({ tableHeaderRows }) => tableHeaderRowsWithFixed(tableHeaderRows);

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

const pluginDependencies = [
  { name: 'Table' },
];

export class TableFixedColumns extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tableColumnDimensions: {},
    };
  }

  handleListenerSizeChange(key, width) {
    this.setState(state => ({
      tableColumnDimensions: {
        ...state.tableColumnDimensions,
        [key]: width,
      },
    }));
  }

  calculatePosition(array, index) {
    return index === 0
      ? 0
      : array
        .slice(0, index)
        .reduce((acc, target) => acc + this.tableColumnDimensions[target] || 0, 0);
  }

  render() {
    const {
      beforeColumnNames,
      beforeColumnTypes,
      afterColumnNames,
      afterColumnTypes,
      cellComponent: Cell,
      listenerRowComponent: ListenerRow,
      listenerCellComponent: ListenerCell,
    } = this.props;
    const {
      tableColumnDimensions,
    } = this.state;

    const tableColumnsComputed = ({ tableColumns }) => tableColumnsWithFixed(
      tableColumns,
      beforeColumnNames,
      beforeColumnTypes,
      afterColumnNames,
      afterColumnTypes,
    );

    return (
      <Plugin
        name="TableFixedColumns"
        dependencies={pluginDependencies}
      >
        <Getter name="tableHeaderRows" computed={tableHeaderRowsComputed} />
        <Getter name="tableColumns" computed={tableColumnsComputed} />
        <Template
          name="tableCell"
          predicate={({ tableColumn }) => !!tableColumn.fixed}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => {
                const { tableColumn } = params;
                const { fixed: side } = tableColumn;
                const targetArray = side === FIXED_COLUMN_BEFORE_SIDE
                  ? getFixedColumnKeys(tableColumns, beforeColumnNames, beforeColumnTypes)
                  : getFixedColumnKeys(tableColumns, afterColumnNames, afterColumnTypes);

                const fixedIndex = targetArray.indexOf(tableColumn.key);
                const index = tableColumns.findIndex(({ key }) => key === tableColumn.key);

                const isBoundary = fixedSide => (fixedIndex === targetArray.length - 1
                  && fixedSide === side);
                const isStandAlone = (shift) => {
                  const neighborTableColumn = tableColumns[index + shift];
                  if (!neighborTableColumn) return false;
                  if (targetArray.indexOf(neighborTableColumn.key) === -1) {
                    return true;
                  }
                  return false;
                };

                const showRightDivider = isBoundary(FIXED_COLUMN_BEFORE_SIDE)
                  || (index !== tableColumns.length - 1 && isStandAlone(1));
                const showLeftDivider = isBoundary(FIXED_COLUMN_AFTER_SIDE)
                  || (index !== 0 && isStandAlone(-1));

                const position = fixedIndex === 0
                  ? 0
                  : targetArray
                    .slice(0, fixedIndex)
                    .reduce((acc, target) => acc + tableColumnDimensions[target] || 0, 0);

                return (
                  <Cell
                    {...params}
                    side={side}
                    component={CellPlaceholder}
                    showLeftDivider={showLeftDivider}
                    showRightDivider={showRightDivider}
                    position={position}
                  />
                );
              }}
            </TemplateConnector>
          )}
        </Template>
        <Template
          name="tableRow"
          predicate={({ tableRow }) => isFixedTableRow(tableRow)}
        >
          {params => (
            <ListenerRow {...params} />
          )}
        </Template>
        <Template
          name="tableCell"
          predicate={({ tableRow }) => isFixedTableRow(tableRow)}
        >
          {params => (
            <ListenerCell
              {...params}
              listen={!!params.tableColumn.fixed}
              onSizeChange={({
                width,
              }) => this.handleListenerSizeChange(params.tableColumn.key, width)}
            />
          )}
        </Template>
      </Plugin>
    );
  }
}

TableFixedColumns.propTypes = {
  beforeColumnNames: PropTypes.arrayOf(PropTypes.string),
  afterColumnNames: PropTypes.arrayOf(PropTypes.string),
  beforeColumnTypes: PropTypes.arrayOf(PropTypes.string),
  afterColumnTypes: PropTypes.arrayOf(PropTypes.string),
  cellComponent: PropTypes.func.isRequired,
  listenerRowComponent: PropTypes.func.isRequired,
  listenerCellComponent: PropTypes.func.isRequired,
};

TableFixedColumns.defaultProps = {
  beforeColumnNames: [],
  afterColumnNames: [],
  beforeColumnTypes: [],
  afterColumnTypes: [],
};
