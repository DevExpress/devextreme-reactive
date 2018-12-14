import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { getBorderColor } from '../utils';

const styles = theme => ({
  popper: {
    zIndex: 1,
    marginBottom: '.5rem',
  },
  paper: {
    padding: `${theme.spacing.unit * 0.5}px ${theme.spacing.unit}px`,
  },
  arrow: {
    position: 'absolute',
    display: 'block',
    width: '1rem',
    height: '.5rem',
    margin: '0 .3rem',
    bottom: '-.5rem', // placement:"top" specific

    '&::before, &::after': {
      position: 'absolute',
      display: 'block',
      content: '""',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: '.5rem .5rem 0', // placement:"top" specific
    },
    '&::before': {
      bottom: 0,
      borderTopColor: getBorderColor(theme),
    },
    '&::after': {
      bottom: '1px',
      borderTopColor: theme.palette.background.paper,
    },
  },
});

class RawOverlay extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    // *React.createRef* is not used because it cannot be accessed (*current* is null)
    // in *componentDidMount* (looks like Popper does not render its children immediately).
    // Accesing it in *componentDidUpdate* requires additional checks.
    // The callback version is just simpler.
    this.arrowRef = element => this.setState({
      modifiers: {
        arrow: { element },
      },
    });
  }

  render() {
    const {
      classes, children, target, ...restProps
    } = this.props;
    const { modifiers } = this.state;
    return (
      <Popper
        open
        anchorEl={target}
        placement="top"
        className={classes.popper}
        modifiers={modifiers}
        {...restProps}
      >
        <Paper className={classes.paper}>
          {children}
        </Paper>
        <div ref={this.arrowRef} className={classes.arrow} />
      </Popper>
    );
  }
}

RawOverlay.propTypes = {
  children: PropTypes.node.isRequired,
  target: PropTypes.func.isRequired,
};

export const Overlay = withStyles(styles)(RawOverlay);
