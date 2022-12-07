import * as React from 'react';
import {
  styled, DialogActions, DialogContent, DialogTitle, Radio, RadioGroup, FormControlLabel,
} from '@mui/material';
import PropTypes from 'prop-types';
import { SMALL_LAYOUT_MEDIA_QUERY } from '../constants';

const PREFIX = 'Layout';

export const classes = {
  title: `${PREFIX}-title`,
  content: `${PREFIX}-content`,
};

const StyledDiv = styled('div')(({ theme: { typography } }) => ({
  [`& .${classes.title}`]: typography.h6,
  [`& .${classes.content}`]: {
    fontSize: '1rem',
  },
  [`${SMALL_LAYOUT_MEDIA_QUERY}`]: {
    [`& .${classes.title}`]: {
      fontSize: '1.1rem',
    },
    [`& .${classes.content}`]: {
      fontSize: '0.9rem',
    },
  },
}));

export const Layout = React.memo(({
  buttonComponent: Button,
  handleClose,
  commit,
  availableOperations,
  getMessage,
  isDeleting,
  ...restProps
}) => {
  const [currentValue, setCurrentValue] = React.useState(availableOperations[0].value);
  const handleChange = React.useCallback(
    (event) => {
      setCurrentValue(event.target.value);
    },
  );

  const onCommitButtonClick = () => {
    commit(currentValue);
  };

  return (
    <StyledDiv
      {...restProps}
    >
      <DialogTitle className={classes.title}>
        {getMessage(isDeleting ? 'menuDeletingTitle' : 'menuEditingTitle')}
      </DialogTitle>
      <DialogContent>
        <RadioGroup
          value={currentValue}
          onChange={handleChange}
        >
          {availableOperations.map(operation => (
            <FormControlLabel
              value={operation.value}
              control={<Radio />}
              label={operation.title}
              key={operation.value}
              classes={{ label: classes.content }}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} title={getMessage('cancelButton')} />
        <Button onClick={onCommitButtonClick} title={getMessage('commitButton')} color="primary" />
      </DialogActions>
    </StyledDiv>
  );
});

Layout.propTypes = {
  buttonComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  availableOperations: PropTypes.array.isRequired,
  handleClose: PropTypes.func,
  commit: PropTypes.func,
  getMessage: PropTypes.func,
  isDeleting: PropTypes.bool,
};

Layout.defaultProps = {
  handleClose: () => undefined,
  commit: () => undefined,
  getMessage: () => undefined,
  isDeleting: false,
};
