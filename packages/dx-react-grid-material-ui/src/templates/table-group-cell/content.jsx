import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material';

const PREFIX = 'Content';
export const classes = {
  columnTitle: `${PREFIX}-columnTitle`,
};
const StyledSpan = styled('span')(() => ({
  [`&.${classes.columnTitle}`]: {
    verticalAlign: 'middle',
  },
}));

export const Content = ({
  column, row, className, children, ...restProps
}) => (
  <StyledSpan
    className={classNames(classes.columnTitle, className)}
    {...restProps}
  >
    <strong>
      {column.title || column.name}
      :
      {' '}
    </strong>
    {children || String(row.value)}
  </StyledSpan>
);

Content.propTypes = {
  row: PropTypes.any,
  column: PropTypes.object,
  children: PropTypes.node,
  className: PropTypes.string,
};

Content.defaultProps = {
  row: {},
  column: {},
  children: undefined,
  className: undefined,
};
