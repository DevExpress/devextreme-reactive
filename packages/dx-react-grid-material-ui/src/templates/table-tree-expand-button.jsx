import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';

const PREFIX = 'TableTreeExpandButton';
export const classes = {
  button: `${PREFIX}-button`,
  hidden: `${PREFIX}-hidden`,
};

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.button}`]: {
    marginTop: '-1px',
    marginBottom: '-1px',
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(2),
    padding: theme.spacing(1),
  },
  [`&.${classes.hidden}`]: {
    cursor: 'default',
    opacity: 0,
  },
}));

export const TableTreeExpandButton = ({
  visible, expanded, onToggle,
  className,
  ...restProps
}) => (
  <StyledIconButton
    className={classNames({
      [classes.button]: true,
      [classes.hidden]: !visible,
    }, className)}
    onClick={(e) => {
      if (!visible) return;
      e.stopPropagation();
      onToggle();
    }}
    tabIndex={visible ? 0 : -1}
    {...restProps}
  >
    {expanded
      ? <ExpandMore />
      : <ChevronRight />}
  </StyledIconButton>
);

TableTreeExpandButton.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

TableTreeExpandButton.defaultProps = {
  visible: false,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};
