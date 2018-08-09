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
  getFixedColumnKeys,
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
      beforeColumnTypes,
      afterColumnTypes,
      cellComponent: Cell,
    } = this.props;

    const fixedColumnNames = [...beforeColumnNames, ...afterColumnNames];
    const fixedColumnTypes = [...beforeColumnTypes, ...afterColumnTypes];

    const fixedColumnKeysComputed = ({ tableColumns }) => [
      ...getFixedColumnKeys(tableColumns, beforeColumnNames, beforeColumnTypes),
      ...getFixedColumnKeys(tableColumns, afterColumnNames, afterColumnTypes),
    ];

    return (
      <Plugin
        name="TableFixedColumns"
        dependencies={pluginDependencies}
      >
        <Getter name="fixedColumnKeys" computed={fixedColumnKeysComputed} />
        <Template
          name="tableCell"
          predicate={({ tableColumn }) => isFixedCell(
            tableColumn, fixedColumnNames, fixedColumnTypes,
          )}
        >
          {params => (
            <TemplateConnector>
              {({ tableColumns }) => {
                const { tableColumn } = params;
                const side = getFixedSide(
                  tableColumn,
                  beforeColumnNames, afterColumnNames,
                  beforeColumnTypes, afterColumnTypes,
                );

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
                    storeSize={(width) => {
                      const { sizes } = this.state;
                      if (sizes[tableColumn.key] !== width) {
                        this.setState((prevState => ({
                          sizes: { ...prevState.sizes, [tableColumn.key]: width },
                        })));
                      }
                    }}
                    getPosition={() => {
                      const { sizes } = this.state;
                      if (fixedIndex === 0) return 0;
                      return sizes[targetArray[fixedIndex - 1]];
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
