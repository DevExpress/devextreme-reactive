import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const styles = theme => ({
  root: {
    alignItems: 'center',
    paddingTop: theme.spacing.unit * 0.5,
    paddingBottom: theme.spacing.unit * 0.5,
  },
});

export class ItemBase extends React.PureComponent {
  render() {
    const {
      children,
      classes,
      className,
      ...restProps
    } = this.props;
    return (
      <ListItem
        className={classNames(classes.root, className)}
        {...restProps}
      >
        {children}
      </ListItem>
    );
  }
}

ItemBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
};

ItemBase.defaultProps = {
  className: undefined,
};

export const Item = withStyles(styles, { name: 'LegendItem' })(ItemBase);
