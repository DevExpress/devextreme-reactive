import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import List from '@mui/icons-material/List';
import { styled } from '@mui/material/styles';

const PREFIX = 'GroupButton';
export const classes = {
  root: `${PREFIX}-root`,
  disabled: `${PREFIX}-disabled`,
};
const StyledDiv = styled('div')(({ theme }) => ({
  [`&.${classes.root}`]: {
    paddingLeft: 0,
    height: theme.spacing(3),
    cursor: 'pointer',
  },
  [`&.${classes.disabled}`]: {
    cursor: 'default',
    opacity: 0.3,
  },
}));

export const GroupButton = ({
  disabled, onGroup, className, ...restProps
}) => (
  <StyledDiv
    onClick={(e) => {
      if (disabled) return;
      e.stopPropagation();
      onGroup(e);
    }}
    className={classNames({
      [classes.root]: true,
      [classes.disabled]: disabled,
    }, className)}
    {...restProps}
  >
    <List />
  </StyledDiv>
);

GroupButton.propTypes = {
  onGroup: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

GroupButton.defaultProps = {
  disabled: false,
  className: undefined,
};
