import React from 'react';
import PropTypes from 'prop-types';

import {
  TemplateRenderer,
} from '@devexpress/dx-react-core';

import {
  tableRowKeyGetter,
  findTableCellTarget,
} from '@devexpress/dx-grid-core';

import { RowLayout } from './row-layout';

export class RowsBlockLayout extends React.PureComponent {
  render() {
    const {
      rows,
      getRowId,
      columns,
      blockTemplate,
      rowTemplate,
      cellTemplate,
      onClick,
      animationState,
    } = this.props;

    return (
      <TemplateRenderer
        template={blockTemplate}
        onClick={(e) => {
          const { rowIndex, columnIndex } = findTableCellTarget(e);
          if (rowIndex === -1 || columnIndex === -1) return;
          onClick({ e, row: rows[rowIndex], column: columns[columnIndex] });
        }}
      >
        {
          rows
            .map((row, rowIndex) => (
              <RowLayout
                key={tableRowKeyGetter(getRowId, row, rowIndex)}
                row={row}
                columns={columns}
                rowTemplate={rowTemplate}
                cellTemplate={cellTemplate}
                animationState={animationState}
              />
            ))
        }
      </TemplateRenderer>
    );
  }
}

RowsBlockLayout.propTypes = {
  rows: PropTypes.array.isRequired,
  getRowId: PropTypes.func.isRequired,
  columns: PropTypes.array.isRequired,
  blockTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  animationState: PropTypes.instanceOf(Map).isRequired,
};
