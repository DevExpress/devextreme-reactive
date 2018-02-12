import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  indent: {
    marginLeft: theme.spacing.unit * 3,
  },
});

export const IndentBase = ({ level, classes }) =>
  Array.from({ length: level })
    .map((_, currentLevel) => (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={currentLevel}
        className={classes.indent}
      />
    ));

IndentBase.propTypes = {
  level: PropTypes.number,
  classes: PropTypes.object.isRequired,
};

IndentBase.defaultProps = {
  level: 0,
};

export const Indent = withStyles(styles)(IndentBase);
