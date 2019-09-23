import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import {
  TITLE_TEXT_EDITOR,
  MULTILINE_TEXT_EDITOR,
  TITLE,
  OUTLINED_SELECT,
  getFrequencyString,
  getRecurrenceOptions,
  REPEAT_TYPES,
  getAvailableRecurrenceOptions,
  handleChangeFrequency,
} from '@devexpress/dx-scheduler-core';

const styles = ({ spacing, typography }) => ({
  root: {
    width: '650px',
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    boxSizing: 'border-box',
    '@media (max-width: 700px)': {
      width: '100%',
      maxWidth: '700px',
      paddingRight: spacing(2),
      paddingLeft: spacing(2),
      paddingBottom: 0,
    },
    '@media (max-width: 850px) and (min-width: 700px)': {
      width: '400px',
    },
    '@media (max-width: 1000px) and (min-width: 850px)': {
      width: '480px',
    },
    '@media (max-width: 1150px)  and (min-width: 1000px)': {
      width: '560px',
    },
  },
  fullSize: {
    paddingBottom: spacing(3),
  },
  labelWithMargins: {
    marginBottom: spacing(0.5),
    marginTop: spacing(0.5),
  },
  notesEditor: {
    marginTop: spacing(0),
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
  '@media (max-width: 570px)': {
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
  locale,
  classes,
  className,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  fullSize,
  textEditorComponent: TextEditor,
  dateEditorComponent: DateEditor,
  selectComponent: Select,
  labelComponent: Label,
  booleanEditorComponent: AllDay,
  ...restProps
}) => {
  const recurrenceOptions = getRecurrenceOptions(appointmentData.rRule);
  const frequency = recurrenceOptions
    ? getFrequencyString(recurrenceOptions.freq)
    : REPEAT_TYPES.NEVER;

  const changeTitle = React.useCallback(title => onFieldChange({ title }), [onFieldChange]);
  const changeNotes = React.useCallback(notes => onFieldChange({ notes }), [onFieldChange]);
  const changeStartDate = React.useCallback(
    startDate => onFieldChange({ startDate }), [onFieldChange],
  );
  const changeEndDate = React.useCallback(endDate => onFieldChange({ endDate }), [onFieldChange]);
  const changeAllDay = React.useCallback(allDay => onFieldChange({ allDay }), [onFieldChange]);

  const { rRule, startDate } = appointmentData;
  const changeFrequency = React.useCallback(repeatType => handleChangeFrequency(
    repeatType, rRule, startDate, onFieldChange,
  ), [rRule, startDate, onFieldChange]);
  const selectOptions = React.useMemo(
    () => getAvailableRecurrenceOptions(getMessage), [getMessage],
  );

  return (
    <div
      className={classNames({
        [classes.root]: true,
        [classes.fullSize]: fullSize,
      }, className)}
      {...restProps}
    >
      <Label
        text={getMessage('detailsLabel')}
        type={TITLE}
      />
      <TextEditor
        placeholder={getMessage('titleLabel')}
        readOnly={readOnly}
        type={TITLE_TEXT_EDITOR}
        value={appointmentData.title}
        onValueChange={changeTitle}
      />
      <Grid
        container
        alignItems="center"
        className={classes.dateEditors}
      >
        <DateEditor
          className={classes.dateEditor}
          readOnly={readOnly}
          value={appointmentData.startDate}
          onValueChange={changeStartDate}
          locale={locale}
        />
        <Label
          text="-"
          className={classes.dividerLabel}
        />
        <DateEditor
          className={classes.dateEditor}
          readOnly={readOnly}
          value={appointmentData.endDate}
          onValueChange={changeEndDate}
          locale={locale}
        />
      </Grid>
      <Label
        text={getMessage('moreInformationLabel')}
        type={TITLE}
        className={classes.labelWithMargins}
      />
      <TextEditor
        placeholder={getMessage('notesLabel')}
        readOnly={readOnly}
        type={MULTILINE_TEXT_EDITOR}
        value={appointmentData.notes}
        onValueChange={changeNotes}
        className={classes.notesEditor}
      />
      <AllDay
        label={getMessage('allDayLabel')}
        readOnly={readOnly}
        value={appointmentData.allDay}
        onValueChange={changeAllDay}
      />
      {children}
      {fullSize && (
        <>
          <Label
            text={getMessage('repeatLabel')}
            type={TITLE}
            className={classes.labelWithMargins}
          />
          <Select
            value={frequency}
            onValueChange={changeFrequency}
            availableOptions={selectOptions}
            type={OUTLINED_SELECT}
            readOnly={readOnly}
          />
        </>
      )}
    </div>
  );
};

LayoutBase.propTypes = {
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  booleanEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  getMessage: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func,
  appointmentData: PropTypes.shape({
    title: PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    rRule: PropTypes.string,
    notes: PropTypes.string,
    additionalInformation: PropTypes.string,
    allDay: PropTypes.bool,
  }).isRequired,
  readOnly: PropTypes.bool,
  fullSize: PropTypes.bool.isRequired,
};

LayoutBase.defaultProps = {
  onFieldChange: () => undefined,
  className: undefined,
  readOnly: false,
  children: null,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'BasicLayout' });
