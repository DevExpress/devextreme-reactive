import React from 'react';
import PropTypes from 'prop-types';
import { getMessageFn } from '@devexpress/dx-grid-core';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

const getPagerTemplate = getMessage => props =>
  <Pager getMessage={getMessage} {...props} />;

const defaultMessages = {
  showAll: 'All',
  rowsPerPage: 'Rows per page:',
  info: ({ firstRow, lastRow, totalCount }) =>
    `${firstRow}${firstRow < lastRow ? `-${lastRow}` : ''} of ${totalCount}`,
};

export class PagingPanel extends React.PureComponent {
  render() {
    const { messages } = this.props;
    const getMessage = getMessageFn({ ...defaultMessages, ...messages });
    const pagerTemplate = getPagerTemplate(getMessage);

    return (
      <PagingPanelBase
        pagerTemplate={pagerTemplate}
        {...this.props}
      />
    );
  }
}

PagingPanel.propTypes = {
  messages: PropTypes.shape({
    showAll: PropTypes.string,
    rowsPerPage: PropTypes.string,
    info: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  }),
};

PagingPanel.defaultProps = {
  messages: {},
};
