import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronRight from '@mui/icons-material/ChevronRight';
import ExpandMore from '@mui/icons-material/ExpandMore';
import IconButton from '@mui/material/IconButton';
import classNames from 'clsx';
import { styled } from '@mui/material/styles';

const PREFIX = 'Icon';
export const classes = {
  groupButton: `${PREFIX}-groupButton`,
};
const StyledIconButton = styled(IconButton)(({ theme }) => ({
  [`&.${classes.groupButton}`]: {
    verticalAlign: 'middle',
    display: 'inline-block',
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));

export const Icon = React.memo(({
  expanded,
  className,
  ...restProps
}) => (
  <StyledIconButton
    className={classNames(classes.groupButton, className)}
    {...restProps}
    size="large"
  >
    {
      expanded
        ? <ExpandMore />
        : <ChevronRight />
    }
  </StyledIconButton>
));

Icon.propTypes = {
  expanded: PropTypes.bool.isRequired,
  className: PropTypes.string,
};

Icon.defaultProps = {
  className: undefined,
};
