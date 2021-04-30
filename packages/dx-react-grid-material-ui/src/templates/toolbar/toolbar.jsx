import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import ToolbarMUI from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/core/styles';
import { getBorder } from '../utils';

const styles = theme => ({
  toolbar: {
    borderBottom: getBorder(theme),
    flex: 'none',
  },
});

class ToolbarBase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    const { setRefKeyboardNavigation } = this.props;
    setRefKeyboardNavigation && setRefKeyboardNavigation(this.ref, 'toolbar', 'none');
  }

  render() {
    const {
      children, classes, className, style, setRefKeyboardNavigation, ...restProps
    } = this.props;
    return (
      <ToolbarMUI
        style={style}
        className={classNames(classes.toolbar, className)}
        ref={this.ref}
        {...restProps}
      >
        {children}
      </ToolbarMUI>
    )
  }
}

ToolbarBase.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
};

ToolbarBase.defaultProps = {
  className: undefined,
  style: null,
};

export const Toolbar = withStyles(styles, { name: 'Toolbar' })(ToolbarBase);
