import React from 'react';
import PropTypes from 'prop-types';
import { combineTemplates } from '@devexpress/dx-react-core';
import { TableHeaderRow as TableHeaderRowBase } from '@devexpress/dx-react-grid';
import { TableHeaderCell } from '../templates/table-header-cell';
import { TableRow } from '../templates/table-row';

const defaultHeaderCellTemplate = props => <TableHeaderCell {...props} />;
const defaultHeaderRowTemplate = props => <TableRow {...props} />;
const defaultMessages = {
  sortingHint: 'Sort',
};

export class TableHeaderRow extends React.PureComponent {
  render() {
    const {
      headerCellTemplate, headerRowTemplate,
      messages, ...restProps
    } = this.props;

    return (
      <TableHeaderRowBase
        headerCellTemplate={combineTemplates(
          headerCellTemplate,
          defaultHeaderCellTemplate,
        )}
        headerRowTemplate={combineTemplates(
          headerRowTemplate,
          defaultHeaderRowTemplate,
        )}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

TableHeaderRow.propTypes = {
  headerCellTemplate: PropTypes.func,
  headerRowTemplate: PropTypes.func,
  messages: PropTypes.shape({
    sortingHint: PropTypes.string,
  }),
};

TableHeaderRow.defaultProps = {
  headerCellTemplate: undefined,
  headerRowTemplate: undefined,
  messages: {},
};
