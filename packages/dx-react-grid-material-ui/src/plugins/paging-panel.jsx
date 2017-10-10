import React from 'react';
import PropTypes from 'prop-types';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

export class PagingPanel extends React.PureComponent {
  render() {
    const {
      messages,
      ...restProps
    } = this.props;

    return (
      <PagingPanelBase
        pagerTemplate={
          props => (
            <Pager
              showAll={messages.showAll}
              rowsPerPage={messages.rowsPerPage}
              info={messages.info}
              {...props}
            />
          )
        }
        {...restProps}
      />
    );
  }
}

PagingPanel.propTypes = {
  messages: PropTypes.shape({
    showAll: PropTypes.string,
    rowsPerPage: PropTypes.string,
    info: PropTypes.string,
  }),
};

PagingPanel.defaultProps = {
  messages: {},
};
