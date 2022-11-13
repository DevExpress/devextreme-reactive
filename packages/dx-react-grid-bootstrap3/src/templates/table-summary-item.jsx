import * as React from 'react';
import PropTypes from 'prop-types';

export const TableSummaryItem = ({
  children,
  type,
  value,
  getMessage,
  style,
  ...restProps
}) => (
  <div
    style={{
      fontWeight: 'bold',
      ...style,
    }}
    {...restProps}
  >
    {
      <React.Fragment>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </React.Fragment>
    }
  </div>
);

TableSummaryItem.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  style: PropTypes.object,
};

TableSummaryItem.defaultProps = {
  value: null,
  children: undefined,
  style: null,
};
