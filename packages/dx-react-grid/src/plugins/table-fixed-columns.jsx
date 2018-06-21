import * as React from 'react';
import * as PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  isFixedCell,
  getFixedSide,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

const pluginDependencies = [
  { name: 'Table' },
];

export class TableFixedColumns extends React.PureComponent {
  constructor(props) {
    super(props);
    this.cellsPositions = {};
  }
  pushCellPosition(columnName, cellPosition) {
    this.cellsPositions[columnName] = cellPosition;
  }
  render() {
    const {
      beforeColumnNames,
      afterColumnNames,
      cellComponent: Cell,
    } = this.props;
    return (
      <Plugin
        name="TableFixedColumns"
        dependencies={pluginDependencies}
      >
        <Getter name="beforeColumnNames" value={beforeColumnNames} />
        <Getter name="afterColumnNames" value={afterColumnNames} />
        <Template
          name="tableCell"
          predicate={({ tableColumn }) => (tableColumn.column
            && isFixedCell(tableColumn.column.name, beforeColumnNames, afterColumnNames))}
        >
          {(params) => {
            const columnName = params.tableColumn.column.name;
            const side = getFixedSide(columnName, beforeColumnNames, afterColumnNames);

            return (
              <Cell
                {...params}
                side={side}
                component={CellPlaceholder}
                ref={(ref) => {
                  const element = findDOMNode(ref);
                  const bounds = element.getBoundingClientRect();
                  const sideProperty = side === 'before' ? 'left' : 'right';
                  const position = bounds[sideProperty] - element.offsetParent.getBoundingClientRect()[sideProperty];
                  this.pushCellPosition(params.tableColumn.column.name, position);
                }}
                getCellPosition={() => this.cellsPositions[params.tableColumn.column.name]}
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
