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
  isFixedCell,
  getFixedSide,
  fixedColumnKeys,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

const pluginDependencies = [
  { name: 'Table' },
];

export class TableFixedColumns extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { sizes: {} };
  }

  render() {
    const {
      beforeColumnNames,
      afterColumnNames,
      cellComponent: Cell,
    } = this.props;

    const fixedColumnKeysComputed = ({ tableColumns }) => fixedColumnKeys(
      tableColumns, beforeColumnNames, afterColumnNames,
    );

    return (
      <Plugin
        name="TableFixedColumns"
        dependencies={pluginDependencies}
      >
        <Getter name="fixedColumnKeys" computed={fixedColumnKeysComputed} />
        <Template
          name="tableCell"
          predicate={({ tableColumn }) => (tableColumn.column
            && isFixedCell(tableColumn.column.name, beforeColumnNames, afterColumnNames))}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => {
                const columnName = params.tableColumn.column.name;
                const side = getFixedSide(columnName, beforeColumnNames, afterColumnNames);
                const targetArray = side === FIXED_COLUMN_BEFORE_SIDE
                  ? beforeColumnNames
                  : afterColumnNames;
                const fixedIndex = targetArray.indexOf(columnName);
                const index = tableColumns.findIndex(({ column }) => column.name === columnName);

                const isBoundary = fixedSide => (fixedIndex === targetArray.length - 1
                  && fixedSide === side);
                const isStandAlone = (shift) => {
                  const neighborTableColumn = tableColumns[index + shift];
                  const neighborColummnName = neighborTableColumn.column
                    && neighborTableColumn.column.name;
                  if (neighborColummnName && targetArray.indexOf(neighborColummnName) === -1) {
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
                    storeSize={(width) => {
                      const { sizes } = this.state;
                      if (sizes[columnName] !== width) {
                        this.setState((prevState => ({
                          sizes: { ...prevState.sizes, [columnName]: width },
                        })));
                      }
                    }}
                    getPosition={() => {
                      const { sizes } = this.state;
                      const prevColumnName = targetArray[fixedIndex - 1];
                      const position = fixedIndex === 0 ? 0 : sizes[prevColumnName];
                      return position;
                    }}
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
  cellComponent: PropTypes.func.isRequired,
};

TableFixedColumns.defaultProps = {
  beforeColumnNames: [],
  afterColumnNames: [],
};
