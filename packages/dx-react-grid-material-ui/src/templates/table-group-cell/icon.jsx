import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

export const Icon = ({
  expanded,
  className,
}) => (
  <IconButton className={className}>
    {
      expanded
        ? <ExpandMore />
        : <ChevronRight />
    }
  </IconButton>
);

Icon.propTypes = {
  expanded: PropTypes.bool,
  className: PropTypes.string,
};

Icon.defaultProps = {
  expanded: false,
  className: undefined,
};
