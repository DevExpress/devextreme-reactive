import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';

const styles = () => ({
  root: {
    fontSize: 14,
    paddingLeft: 8,
    paddingRight: 8,
  },
});

class LabelBase extends React.PureComponent {
  render() {
    const {
      text, classes, className, ...restProps
    } = this.props;
    return (
      <ListItemText
        className={classNames(classes.root, className)}
        {...restProps}
      >
        {text}
      </ListItemText>
    );
  }
}

LabelBase.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

LabelBase.defaultProps = {
  className: undefined,
};

export const Label = withStyles(styles, { name: 'LegendLabel' })(LabelBase);
