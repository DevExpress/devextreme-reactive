import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { OutlinedSelect } from '../common/select/outlined-select';

const styles = ({ spacing }) => ({
  input: {
    padding: spacing(1.25, 1.75),
    paddingRight: spacing(4),
    textTransform: 'uppercase',
    '@media (max-width: 700px)': {
      fontSize: '0.75rem',
    },
  },
  inputRoot: {
    marginLeft: spacing(0.5),
    '&:first-child': {
      marginLeft: 0,
    },
  },
});

const SwitcherBase = React.memo(({
  currentView,
  availableViews,
  onChange, classes,
  ...restProps
}) => {
  const availableOptions = availableViews.map(({ name, displayName }) => ({
    id: name,
    text: displayName,
  }));

  return (
    <OutlinedSelect
      value={currentView.name}
      availableOptions={availableOptions}
      onValueChange={onChange}
      inputClasses={{ input: classes.input, root: classes.inputRoot }}
      {...restProps}
    />
  );
});

SwitcherBase.propTypes = {
  onChange: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  currentView: PropTypes.shape({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  }).isRequired,
  availableViews: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    displayName: PropTypes.string.isRequired,
  })),
};

SwitcherBase.defaultProps = {
  availableViews: [],
};

export const Switcher = withStyles(styles)(SwitcherBase, { name: 'Switcher' });
