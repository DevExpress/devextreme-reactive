import * as React from 'react';
import * as PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const PREFIX = 'TableTreeIndent';
export const classes = {
  indent: `${PREFIX}-indent`,
};

const StyledSpan = styled('span')(({ theme }) => ({
  [`&.${classes.indent}`]: {
    marginLeft: theme.spacing(3),
  },
}));

export const TableTreeIndent = React.memo(({ level }) => Array.from({ length: level })
  .map((value, currentLevel) => (
    <StyledSpan
        // eslint-disable-next-line react/no-array-index-key
      key={currentLevel}
      className={classes.indent}
    />
  )));

TableTreeIndent.propTypes = {
  level: PropTypes.number,
};

TableTreeIndent.defaultProps = {
  level: 0,
};
