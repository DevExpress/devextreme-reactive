import React from 'react';
import PropTypes from 'prop-types';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/paging-panel/pager';

const defaultMessages = {
  showAll: 'All',
  rowsPerPage: 'Rows per page:',
  info: ({ from, to, count }) =>
    `${from}${from < to ? `-${to}` : ''} of ${count}`,
};

export class PagingPanel extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;

    return (
      <PagingPanelBase
        containerComponent={Pager}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

PagingPanel.Container = Pager;

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
