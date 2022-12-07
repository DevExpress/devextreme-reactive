import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material';

const PREFIX = 'TableSummaryItem';
export const classes = {
  item: `${PREFIX}-item`,
};

const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.item}`]: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.text.primary,
    fontSize: theme.typography.pxToRem(13),
  },
}));

export const TableSummaryItem = ({
  children,
  type,
  value,
  getMessage,
  className,
  ...restProps
}) => (
  <StyledDiv
    className={classNames([classes.item], className)}
    {...restProps}
  >
    {
      <React.Fragment>
        {getMessage(type)}
        :&nbsp;&nbsp;
        {children}
      </React.Fragment>
    }
  </StyledDiv>
);

TableSummaryItem.propTypes = {
  value: PropTypes.number,
  type: PropTypes.string.isRequired,
  getMessage: PropTypes.func.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

TableSummaryItem.defaultProps = {
  value: null,
  children: undefined,
  className: undefined,
};
