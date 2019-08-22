import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {
  TITLE_TEXT_EDITOR,
  NOTES_TEXT_EDITOR,
  TITLE_LABEL,
  OUTLINED_SELECT,
  getFrequencyString,
  getRecurrenceOptions,
  REPEAT_TYPES,
} from '@devexpress/dx-scheduler-core';
import { getAvailableRecurrenceOptions, handleChangeFrequency } from '../helpers';

const styles = ({ spacing, typography }) => ({
  root: {
    width: '65%',
    paddingTop: spacing(3),
    paddingBottom: 0,
    paddingLeft: spacing(4),
    maxWidth: '650px',
    boxSizing: 'border-box',
    '@media (max-width: 700px)': {
      width: '100%',
      maxWidth: '700px',
      paddingRight: spacing(2),
    },
  },
  fullSize: {
    width: '100%',
    paddingLeft: spacing(2),
  },
  notesEditor: {
    marginTop: spacing(2),
  },
  moreInformationLabel: {
    marginBottom: spacing(0.5),
    marginTop: spacing(0.5),
  },
  dateEditor: {
    width: '45%',
  },
  dividerLabel: {
    ...typography.body2,
    width: '10%',
    textAlign: 'center',
    paddingBottom: '0.5em',
  },
  '@media (max-width: 500px)': {
    dateEditors: {
      flexDirection: 'column',
    },
    dateEditor: {
      width: '100%',
      '&:first-child': {
        marginBottom: 0,
      },
      '&:last-child': {
        marginTop: 0,
      },
    },
    dividerLabel: {
      display: 'none',
    },
  },
});

const LayoutBase = ({
  children,
  classes,
  className,
  textEditorComponent: TextEditor,
  dateEditorComponent: DateEditor,
  selectComponent: Select,
  labelComponent: Label,
  allDayComponent: AllDay,
  getMessage,
  onAppointmentFieldChange,
  changedAppointment,
  readOnly,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(changedAppointment.rRule);
  const frequency = recurrenceOptions
    ? getFrequencyString(recurrenceOptions.freq)
    : REPEAT_TYPES.NEVER;
  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes.fullSize]: !changedAppointment.rRule,
      }, className)}
      {...restProps}
    >
      <Label
        label={getMessage('detailsLabel')}
        id={TITLE_LABEL}
      />
      <TextEditor
        label={getMessage('titleLabel')}
        readOnly={readOnly}
        id={TITLE_TEXT_EDITOR}
        value={changedAppointment.title}
        onValueChange={title => onAppointmentFieldChange({ title })}
      />
      <Grid
        container
        alignItems="center"
        className={classes.dateEditors}
      >
        <DateEditor
          className={classes.dateEditor}
          disabled={readOnly}
          date={changedAppointment.startDate}
          onDateChange={startDate => onAppointmentFieldChange({ startDate })}
        />
        <Label
          label="-"
          className={classes.dividerLabel}
        />
        <DateEditor
          className={classes.dateEditor}
          disabled={readOnly}
          date={changedAppointment.endDate}
          onDateChange={endDate => onAppointmentFieldChange({ endDate })}
        />
      </Grid>
      <Label
        label={getMessage('moreInformationLabel')}
        id={TITLE_LABEL}
        className={classes.moreInformationLabel}
      />
      <TextEditor
        label={getMessage('additionalInformationLabel')}
        readOnly={readOnly}
        value={changedAppointment.additionalInformation}
        onValueChange={additionalInformation => onAppointmentFieldChange({ additionalInformation })}
      />
      <TextEditor
        label={getMessage('notesLabel')}
        readOnly={readOnly}
        id={NOTES_TEXT_EDITOR}
        value={changedAppointment.notes}
        onValueChange={notes => onAppointmentFieldChange({ notes })}
        className={classes.notesEditor}
      />
      <AllDay
        label={getMessage('allDayLabel')}
        readOnly={readOnly}
        value={changedAppointment.allDay}
        onValueChange={allDay => onAppointmentFieldChange({ allDay })}
      />
      {(!changedAppointment.rRule) && (
        <React.Fragment>
          <Label
            label={getMessage('repeatLabel')}
            id={TITLE_LABEL}
          />
          <Select
            onChange={repeatType => handleChangeFrequency(
              repeatType, changedAppointment, onAppointmentFieldChange,
            )}
            availableOptions={getAvailableRecurrenceOptions(getMessage)}
            value={frequency}
            id={OUTLINED_SELECT}
          />
        </React.Fragment>
      )}
      {children}
    </div>
  );
};

LayoutBase.propTypes = {
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  allDayComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  onAppointmentFieldChange: PropTypes.func,
  changedAppointment: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  readOnly: PropTypes.bool,
};

LayoutBase.defaultProps = {
  className: undefined,
  readOnly: false,
  onAppointmentFieldChange: () => undefined,
  children: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
