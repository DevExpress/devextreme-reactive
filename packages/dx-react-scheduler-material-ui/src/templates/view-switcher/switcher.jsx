import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import { OutlinedSelect } from '../common/select/outlined-select';
import { LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'Switcher';

const classes = {
  input: `${PREFIX}-input`,
  inputRoot: `${PREFIX}-inputRoot`,
};

const StyledOutlinedSelect = styled(OutlinedSelect)(({
  theme: { spacing },
}) => ({
  [`& .${classes.input}`]: {
    padding: spacing(1.25, 1.75),
    paddingRight: spacing(4),
    textTransform: 'uppercase',
    [`${LAYOUT_MEDIA_QUERY}`]: {
      fontSize: '0.75rem',
    },
  },

  [`& .${classes.inputRoot}`]: {
    marginLeft: spacing(0.5),
    '&:first-child': {
      marginLeft: 0,
    },
  },
}));

const SwitcherBase = React.memo(({
  currentView,
  availableViews,
  onChange,
  ...restProps
}) => {
  const availableOptions = availableViews.map(({ name, displayName }) => ({
    id: name,
    text: displayName,
  }));

  return (
    <StyledOutlinedSelect
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

export const Switcher = (SwitcherBase);
