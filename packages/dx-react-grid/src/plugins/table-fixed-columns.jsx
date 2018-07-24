import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  FIXED_COLUMN_BEFORE_SIDE,
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

    const fixedColumnKeysComputed = ({ tableColumns }) =>
      fixedColumnKeys(tableColumns, beforeColumnNames, afterColumnNames);

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
          {(params) => {
            const columnName = params.tableColumn.column.name;
            const side = getFixedSide(columnName, beforeColumnNames, afterColumnNames);
            const targetArray = side === FIXED_COLUMN_BEFORE_SIDE
              ? beforeColumnNames
              : afterColumnNames;
            const index = targetArray.indexOf(columnName);

            return (
              <Cell
                {...params}
                side={side === FIXED_COLUMN_BEFORE_SIDE ? 'left' : 'right'}
                component={CellPlaceholder}
                showDivider={index === targetArray.length - 1}
                storeSize={(width) => {
                  if (this.state.sizes[columnName] !== width) {
                    this.setState((prevState => ({
                      sizes: { ...prevState.sizes, [columnName]: width },
                    })));
                  }
                }}
                getPosition={() => {
                  const prevColumnName = targetArray[index - 1];
                  const position = index === 0 ? 0 : this.state.sizes[prevColumnName];
                  return position;
                }}
              />
            );
          }}
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
