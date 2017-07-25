import React from 'react';
import PropTypes from 'prop-types';

import {
  TemplateRenderer,
} from '@devexpress/dx-react-core';

import {
  tableColumnKeyGetter,
  getTableCellInfo,
} from '@devexpress/dx-grid-core';

const getColumnStyle = ({ column, animationState = {} }) => ({
  width: column.width !== undefined ? `${column.width}px` : undefined,
  ...animationState,
});

const getRowStyle = ({ row }) => ({
  height: row.height !== undefined ? `${row.height}px` : undefined,
});

export class RowLayout extends React.PureComponent {
  render() {
    const {
      row,
      columns,
      rowTemplate,
      cellTemplate,
      animationState,
    } = this.props;

    return (
      <TemplateRenderer
        template={rowTemplate}
        row={row}
        style={getRowStyle({ row })}
      >
        {
          columns
            .filter((column, columnIndex) => !getTableCellInfo({ row, columns, columnIndex }).skip)
            .map((column, columnIndex) => {
              const key = tableColumnKeyGetter(column, columnIndex);
              const colspan = getTableCellInfo({ row, columns, columnIndex }).colspan;
              return (
                <TemplateRenderer
                  key={key}
                  template={cellTemplate}
                  row={row}
                  column={column}
                  style={getColumnStyle({ column, animationState: animationState.get(key) })}
                  {...colspan ? { colspan } : null}
                />
              );
            })
        }
      </TemplateRenderer>
    );
  }
}

RowLayout.propTypes = {
  row: PropTypes.object.isRequired,
  columns: PropTypes.array.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  animationState: PropTypes.instanceOf(Map).isRequired,
};
