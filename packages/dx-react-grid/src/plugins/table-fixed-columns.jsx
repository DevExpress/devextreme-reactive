import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Getter,
  Template,
  Plugin,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import {
  isFixedCell,
  getFixedPosition,
} from '@devexpress/dx-grid-core';

const CellPlaceholder = props => <TemplatePlaceholder params={props} />;

const pluginDependencies = [
  { name: 'Table' },
];

export class TableFixedColumns extends React.PureComponent {
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
            const fixedPosition =
              getFixedPosition(params.tableColumn.column.name, beforeColumnNames, afterColumnNames);
            return (
              <Cell
                {...params}
                fixedPosition={fixedPosition}
                component={CellPlaceholder}
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
