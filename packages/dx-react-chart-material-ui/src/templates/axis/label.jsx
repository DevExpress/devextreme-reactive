import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => {
  const { fontFamily } = theme.typography;
  return ({
    root: {
      fill: theme.palette.text.secondary,
      fontFamily,
      fontSize: 12,
      fontWeight: 400,
      backgroundColor: theme.palette.background.paper,
    },
  });
};

export class LabelBase extends React.PureComponent {
  render() {
    const {
      text, x, y, dominantBaseline, textAnchor, classes, className, ...restProps
    } = this.props;

    return (
      <text
        className={classNames(classes.root, className)}
        dominantBaseline={dominantBaseline}
        textAnchor={textAnchor}
        x={x}
        y={y}
        {...restProps}
      >
        {text}
      </text>
    );
  }
}

LabelBase.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  dominantBaseline: PropTypes.string.isRequired,
  textAnchor: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

LabelBase.defaultProps = {
  className: undefined,
};

export const Label = withStyles(styles)(LabelBase);
