import React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import FormControlLabel from '@mui/material/FormControlLabel';
import classNames from 'clsx';
import Radio from '@mui/material/Radio';
import Grid from '@mui/material/Grid';
import { NUMBER_EDITOR } from '@devexpress/dx-scheduler-core';

const PREFIX = 'ChangeMonthEditor';

export const classes = {
  textEditor: `${PREFIX}-textEditor`,
  label: `${PREFIX}-label`,
  select: `${PREFIX}-select`,
  formControl: `${PREFIX}-formControl`,
  controlLabel: `${PREFIX}-controlLabel`,
};

const StyledFormControlLabel = styled(FormControlLabel)(({ theme: { spacing } }) => ({
  [`&.${classes.formControl}`]: {
    marginRight: 0,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  [`&.${classes.controlLabel}`]: {
    width: '100%',
  },
}));

const ChangeMonthEditorBase = React.memo(({
  getMessage,
  labelComponent: Label,
  textEditorComponent: TextEditor,
  selectComponent: Select,
  readOnly,
  readOnlyEditors,
  month,
  changeMonth,
  months,
  dayNumber,
  changeByMonthDay,
  className,
  ...restProps
}) => {
  const StyledLabel = styled(Label)(() => ({
    [`&.${classes.label}`]: {
      width: '4.5em',
    },
  }));

  const StyledSelect = styled(Select)(() => ({
    [`&.${classes.select}`]: {
      width: 'calc((100% - 5.5em) * 3 / 7)',
      maxWidth: '8em',
    },
  }));

  const StyledTextEditor = styled(TextEditor)(() => ({
    [`&.${classes.textEditor}`]: {
      width: 'calc((100% - 5.5em) * 4 / 7)',
      minWidth: 'calc(100% - 13.5em)',
      marginLeft: '1em',
    },
  }));

  return (
    <StyledFormControlLabel
      value="onDayAndMonth"
      className={classNames(classes.formControl, className)}
      classes={{ label: classes.controlLabel }}
      control={<Radio color="primary" />}
      disabled={readOnly}
      {...restProps}
      label={(
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <StyledLabel
            text={getMessage('everyLabel')}
            className={classes.label}
          />
          <StyledSelect
            className={classes.select}
            value={month}
            onValueChange={changeMonth}
            readOnly={readOnlyEditors}
            availableOptions={months}
          />
          <StyledTextEditor
            className={classes.textEditor}
            readOnly={readOnlyEditors}
            value={dayNumber}
            type={NUMBER_EDITOR}
            onValueChange={changeByMonthDay}
          />
        </Grid>
        )}
    />
  );
});

ChangeMonthEditorBase.propTypes = {
  getMessage: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  readOnly: PropTypes.bool,
  month: PropTypes.number.isRequired,
  changeMonth: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  dayNumber: PropTypes.number.isRequired,
  changeByMonthDay: PropTypes.func.isRequired,
  className: PropTypes.string,
  readOnlyEditors: PropTypes.bool,
};

ChangeMonthEditorBase.defaultProps = {
  getMessage: () => undefined,
  readOnly: false,
  className: undefined,
  readOnlyEditors: false,
};

export const ChangeMonthEditor = (ChangeMonthEditorBase);
