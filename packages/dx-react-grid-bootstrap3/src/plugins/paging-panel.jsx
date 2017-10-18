import React from 'react';
import PropTypes from 'prop-types';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

const pagerTemplate = props => <Pager {...props} />;

const defaultMessages = {
  showAll: 'All',
  info: ({ firstRow, lastRow, totalCount }) =>
    `${firstRow}${firstRow < lastRow ? `-${lastRow}` : ''} of ${totalCount}`,
};

export class PagingPanel extends React.PureComponent {
  render() {
    const { messages, ...restProps } = this.props;

    return (
      <PagingPanelBase
        pagerTemplate={pagerTemplate}
        messages={{ ...defaultMessages, ...messages }}
        {...restProps}
      />
    );
  }
}

PagingPanel.propTypes = {
  messages: PropTypes.shape({
    showAll: PropTypes.string,
    info: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]),
  }),
};

PagingPanel.defaultProps = {
  messages: {},
};
