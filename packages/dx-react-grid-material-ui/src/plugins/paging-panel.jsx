import React from 'react';
import PropTypes from 'prop-types';
import { PagingPanel as PagingPanelBase } from '@devexpress/dx-react-grid';
import { Pager } from '../templates/pager';

export class PagingPanel extends React.PureComponent {
  render() {
    const {
      showAllText,
      rowsPerPageText,
      infoText,
      ...restProps
    } = this.props;

    return (
      <PagingPanelBase
        pagerTemplate={
          props => (
            <Pager
              showAllText={showAllText}
              rowsPerPageText={rowsPerPageText}
              infoText={infoText}
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
  showAllText: PropTypes.string,
  rowsPerPageText: PropTypes.string,
  infoText: PropTypes.string,
};

PagingPanel.defaultProps = {
  showAllText: undefined,
  rowsPerPageText: undefined,
  infoText: undefined,
};
