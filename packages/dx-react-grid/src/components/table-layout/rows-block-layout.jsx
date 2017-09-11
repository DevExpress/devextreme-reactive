import React from 'react';
import PropTypes from 'prop-types';

import {
  TemplateRenderer,
} from '@devexpress/dx-react-core';

import { RowLayout } from './row-layout';

export class RowsBlockLayout extends React.PureComponent {
  render() {
    const {
      rows,
      columns,
      blockTemplate,
      rowTemplate,
      cellTemplate,
    } = this.props;

    return (
      <TemplateRenderer
        template={blockTemplate}
      >
        {
          rows
            .map(row => (
              <RowLayout
                key={row.key}
                row={row}
                columns={columns}
                rowTemplate={rowTemplate}
                cellTemplate={cellTemplate}
              />
            ))
        }
      </TemplateRenderer>
    );
  }
}

RowsBlockLayout.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  blockTemplate: PropTypes.func.isRequired,
  rowTemplate: PropTypes.func.isRequired,
  cellTemplate: PropTypes.func.isRequired,
};
