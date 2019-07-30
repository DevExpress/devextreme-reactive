import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';

const styles = theme => ({
  root: {
    overflowY: 'auto',
    paddingTop: theme.spacing(3),
    paddingBottom: 0,
  },
});

const LayoutBase = ({
  children,
  classes,
  className,
  recurrenceEditing,
  style,
  textEditorComponent: TextEditor,
  dateTimeEditorComponent: DateTimeEditor,
  recurrenceSwitcherComponent: RecurrenceSwitcher,
  labelComponent: Label,
  allDayComponent: AllDay,
  getMessage,
  changeAppointmentField,
  changedAppointment,
  changeAppointment,
  readOnly,
  ...restProps
}) => {
  const layoutStyle = recurrenceEditing === 'Never' ? {
    width: '100%',
  } : {
    width: '50%',
  };
  return (
    <div
      className={classNames(classes.root, className)}
      style={{ ...layoutStyle, ...style }}
      {...restProps}
    >
      <Label label={getMessage('detailsLabel')} />
      <TextEditor
        label={getMessage('titleLabel')}
        readOnly={readOnly}
        isTitle
        value={changedAppointment.title}
        {...changeAppointment && {
          onValueChange: title => changeAppointmentField({ change: { title } }),
        }}
      />
      <DateTimeEditor
        readOnly={readOnly}
        startDate={changedAppointment.startDate}
        endDate={changedAppointment.endDate}
        {...changeAppointment && {
          onStartDateValueChange:
            startDate => changeAppointmentField({
              change: { startDate: startDate.toDate() },
            }),
          onEndDateValueChange:
            (endDate) => {
              changeAppointmentField({
                change: { endDate: endDate.toDate() },
              });
            },
        }}
      />
      <Label label={getMessage('moreInformationLabel')} />
      <TextEditor
        label={getMessage('additionalInformationLabel')}
        readOnly={readOnly}
        value={changedAppointment.additionalInformation}
        {...changeAppointment && {
          onValueChange: additionalInformation => changeAppointmentField({ change: { additionalInformation } }),
        }}
      />
      <Label label={getMessage('notesLabel')} />
      <TextEditor
        label={getMessage('notesLabel')}
        readOnly={readOnly}
        notes
        value={changedAppointment.notes}
        {...changeAppointment && {
          onValueChange: notes => changeAppointmentField({ change: { notes } }),
        }}
      />
      <Label label={getMessage('repeatLabel')} />
      <AllDay
        label={getMessage('allDayLabel')}
        readOnly={readOnly}
        value={changedAppointment.allDay}
        {...changeAppointment && {
          onValueChange: allDay => changeAppointmentField({ change: { allDay } }),
        }}
      />
      <RecurrenceSwitcher />
      {children}
    </div>
  );
};

LayoutBase.propTypes = {
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateTimeEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  recurrenceSwitcherComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  allDayComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  recurrenceEditing: PropTypes.bool.isRequired,
  style: PropTypes.object,
  getMessage: PropTypes.func.isRequired,
  changeAppointmentField: PropTypes.func.isRequired,
  changedAppointment: PropTypes.object.isRequired,
  changeAppointment: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
};

LayoutBase.defaultProps = {
  className: undefined,
  style: null,
  readOnly: false,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
