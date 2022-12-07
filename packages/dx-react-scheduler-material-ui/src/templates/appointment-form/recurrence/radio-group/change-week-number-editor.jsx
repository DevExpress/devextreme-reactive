import React from 'react';
import {
  styled, FormControlLabel, Radio, Grid,
} from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const PREFIX = 'ChangeWeekNumberEditor';

export const classes = {
  label: `${PREFIX}-label`,
  select: `${PREFIX}-select`,
  longSelect: `${PREFIX}-longSelect`,
  formControlLabel: `${PREFIX}-formControlLabel`,
  formControl: `${PREFIX}-formControl`,
  doubleSelect: `${PREFIX}-doubleSelect`,
  radioButton: `${PREFIX}-radioButton`,
  controlLabel: `${PREFIX}-controlLabel`,
};

const StyledDiv = styled('div')(({ theme: { spacing } }) => ({
  [`& .${classes.label}`]: {
    width: '4.5em',
  },
  [`& .${classes.select}`]: {
    width: 'calc((100% - 5.5em) * 3 / 7)',
    maxWidth: '8em',
  },
  [`& .${classes.longSelect}`]: {
    width: 'calc((100% - 5.5em) * 4 / 7)',
    minWidth: 'calc(100% - 13.5em)',
    marginLeft: '1em',
  },
  [`& .${classes.doubleSelect}`]: {
    marginLeft: '4.5em',
    width: 'calc(100% - 4.5em)',
    marginTop: spacing(1),
  },
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme: { spacing } }) => ({
  [`&.${classes.formControlLabel}`]: {
    alignItems: 'flex-start',
  },
  [`&.${classes.formControl}`]: {
    marginRight: 0,
    marginTop: spacing(1),
    marginBottom: spacing(1),
  },
  [`&.${classes.controlLabel}`]: {
    width: '100%',
  },
}));

const StyledRadio = styled(Radio)(({ theme: { spacing } }) => ({
  [`&.${classes.radioButton}`]: {
    marginTop: spacing(0.75),
  },
}));

export const ChangeWeekNumberEditor = React.memo(({
  getMessage,
  labelComponent: Label,
  selectComponent: Select,
  readOnly,
  readOnlyEditors,
  className,
  weekNumber,
  weekNumbers,
  changeWeekNumber,
  month,
  months,
  changeMonth,
  dayOfWeek,
  daysOfWeek,
  changeDayOfWeek,
  ...restProps
}) => (
  <StyledFormControlLabel
    value="onDayOfWeek"
    className={classNames(classes.formControlLabel, classes.formControl, className)}
    classes={{ label: classes.controlLabel }}
    control={<StyledRadio color="primary" className={classes.radioButton} />}
    disabled={readOnly}
    {...restProps}
    label={(
      <StyledDiv>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Label
            className={classes.label}
            text={getMessage('theLabel')}
          />
          <Select
            className={classes.select}
            value={weekNumber}
            onValueChange={changeWeekNumber}
            readOnly={readOnlyEditors}
            availableOptions={weekNumbers}
          />
          <Select
            className={classes.longSelect}
            value={dayOfWeek}
            onValueChange={changeDayOfWeek}
            readOnly={readOnlyEditors}
            availableOptions={daysOfWeek}
          />
        </Grid>
        <Select
          className={classes.doubleSelect}
          value={month}
          onValueChange={changeMonth}
          readOnly={readOnlyEditors}
          availableOptions={months}
        />
      </StyledDiv>
    )}
  />
));

ChangeWeekNumberEditor.propTypes = {
  getMessage: PropTypes.func,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  readOnly: PropTypes.bool,
  month: PropTypes.number.isRequired,
  changeMonth: PropTypes.func.isRequired,
  months: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  weekNumber: PropTypes.number.isRequired,
  changeWeekNumber: PropTypes.func.isRequired,
  weekNumbers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  dayOfWeek: PropTypes.number.isRequired,
  changeDayOfWeek: PropTypes.func.isRequired,
  daysOfWeek: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
  className: PropTypes.string,
  readOnlyEditors: PropTypes.bool,
};

ChangeWeekNumberEditor.defaultProps = {
  getMessage: () => undefined,
  readOnly: false,
  className: undefined,
  readOnlyEditors: false,
};
