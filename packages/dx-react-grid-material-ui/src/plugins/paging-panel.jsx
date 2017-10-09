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
              showAllText={messages.showAllText}
              rowsPerPageText={messages.rowsPerPageText}
              infoText={messages.infoText}
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
    showAllText: PropTypes.string,
    rowsPerPageText: PropTypes.string,
    infoText: PropTypes.string,
  }),
};

PagingPanel.defaultProps = {
  messages: {},
};
