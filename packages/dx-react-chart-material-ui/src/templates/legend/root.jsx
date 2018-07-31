import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const styles = () => ({
  root: {
    paddingTop: 16,
    paddingBottom: 16,
  },
});
class RootBase extends React.PureComponent {
  render() {
    const {
      children,
      classes,
      className,
      ...restProps
    } = this.props;
    return (
      <List
        className={classNames(classes.root, className)}
        {...restProps}
      >
        {children}
      </List>
    );
  }
}

RootBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

RootBase.defaultProps = {
  className: undefined,
};

export const Root = withStyles(styles, { name: 'LegendRoot' })(RootBase);
