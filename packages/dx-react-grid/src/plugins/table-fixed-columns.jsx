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
  getFixedColumnKeys,
  tableColumnsWithFixed,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

const pluginDependencies = [
  { name: 'Table' },
];

const getColumnPosition = dimensions => (dimensions
  ? dimensions.right
  : undefined);

export class TableFixedColumns extends React.PureComponent {
  render() {
    const {
      beforeColumnNames,
      beforeColumnTypes,
      afterColumnNames,
      afterColumnTypes,
      cellComponent: Cell,
    } = this.props;

    const tableColumnsWithFixedComputed = ({ tableColumns }) => tableColumnsWithFixed(
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
        <Getter name="tableColumns" computed={tableColumnsWithFixedComputed} />
        <Template
          name="tableCell"
          predicate={({ tableColumn }) => !!tableColumn.fixed}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns, tableColumnDimensions }) => {
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

                return (
                  <Cell
                    {...params}
                    side={side}
                    component={CellPlaceholder}
                    showLeftDivider={showLeftDivider}
                    showRightDivider={showRightDivider}
                    position={
                      fixedIndex === 0
                        ? 0
                        : getColumnPosition(tableColumnDimensions[targetArray[fixedIndex - 1]])
                    }
                  />
                );
              }}
            </TemplateConnector>
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
};

TableFixedColumns.defaultProps = {
  beforeColumnNames: [],
  afterColumnNames: [],
  beforeColumnTypes: [],
  afterColumnTypes: [],
};
