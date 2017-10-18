import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableFilterRow as TableFilterRowBase } from '@devexpress/dx-react-grid';
import { TableFilterCell } from '../templates/table-filter-cell';
import { TableRow } from '../templates/table-row';

const defaultFilterCellTemplate = props => <TableFilterCell {...props} />;
const defaultFilterRowTemplate = props => <TableRow {...props} />;

const defaultMessages = {
  filterPlaceholder: 'Filter...',
};

export class TableFilterRow extends React.PureComponent {
  render() {
    const {
      filterCellTemplate, filterRowTemplate, messages, ...restProps
    } = this.props;

    return (
      <TableFilterRowBase
        filterCellTemplate={combineTemplates(
          filterCellTemplate,
          defaultFilterCellTemplate,
        )}
        filterRowTemplate={combineTemplates(
          filterRowTemplate,
          defaultFilterRowTemplate,
        )}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableFilterRow.propTypes = {
  filterCellTemplate: PropTypes.func,
  filterRowTemplate: PropTypes.func,
  messages: PropTypes.shape({
    filterPlaceholder: PropTypes.string,
  }),
};

TableFilterRow.defaultProps = {
  filterCellTemplate: undefined,
  filterRowTemplate: undefined,
  messages: {},
};
