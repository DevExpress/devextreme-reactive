import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => {
  const { palette, typography } = theme;
  const light = palette.type === 'light';
  return {
    staticContent: {
      fontFamily: typography.fontFamily,
      color: light ? 'rgba(0, 0, 0, 0.87)' : palette.common.white,
      fontSize: typography.pxToRem(16),
    },
  };
};

const StaticFilterCellContentBase = ({ children, classes }) => (
  <div className={classes.staticContent}>{children}</div>
);

StaticFilterCellContentBase.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export const StaticFilterCellContent = withStyles(styles, { name: 'StaticFilterCellContent' })(StaticFilterCellContentBase);
