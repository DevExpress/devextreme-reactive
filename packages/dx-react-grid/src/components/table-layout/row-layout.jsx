import React from 'react';
import PropTypes from 'prop-types';

import {
  TemplateRenderer,
} from '@devexpress/dx-react-core';

import {
  tableKeyGetter,
  getTableRowColumnsWithColSpan,
} from '@devexpress/dx-grid-core';

const getColumnStyle = ({ column }) => ({
  width: column.width !== undefined ? `${column.width}px` : undefined,
  ...column.animationState,
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
    } = this.props;

    return (
      <TemplateRenderer
        template={rowTemplate}
        row={row}
        style={getRowStyle({ row })}
      >
        {
          getTableRowColumnsWithColSpan(columns, row.colSpanStart)
            .map(({ original: column, colspan }) => (
              <TemplateRenderer
                key={tableKeyGetter(column)}
                template={cellTemplate}
                tableRow={row}
                tableColumn={column}
                style={getColumnStyle({ column })}
                {...colspan ? { colspan } : null}
              />
            ))
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
};
