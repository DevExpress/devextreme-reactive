import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  indent: {
    marginLeft: theme.spacing.unit * 3,
  },
});

export const TableTreeIndentBase = ({ level, classes }) =>
  Array.from({ length: level })
    .map((value, currentLevel) => (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={currentLevel}
        className={classes.indent}
      />
    ));

TableTreeIndentBase.propTypes = {
  level: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

TableTreeIndentBase.defaultProps = {
  level: 0,
};

export const TableTreeIndent = withStyles(styles)(TableTreeIndentBase);
