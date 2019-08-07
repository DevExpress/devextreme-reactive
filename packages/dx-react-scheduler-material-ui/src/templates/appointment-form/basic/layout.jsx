import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  TITLE_TEXT_EDITOR,
  NOTES_TEXT_EDITOR,
  FULL_DATE_TIME_EDITOR,
  TITLE_LABEL,
} from '@devexpress/dx-scheduler-core';

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
  style,
  textEditorComponent: TextEditor,
  dateTimeEditorComponent: DateTimeEditor,
  recurrenceSwitcherComponent: RecurrenceSwitcher,
  labelComponent: Label,
  allDayComponent: AllDay,
  getMessage,
  changeAppointmentField,
  changedAppointment,
  readOnly,
  ...restProps
}) => {
  const layoutStyle = !changedAppointment.rRule ? {
    width: '100%',
  } : {
    width: '65%',
  };
  return (
    <div
      className={classNames(classes.root, className)}
      style={{ ...layoutStyle, ...style }}
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
        onValueChange={title => changeAppointmentField({ change: { title } })}
      />
      <DateTimeEditor
        readOnly={readOnly}
        startDate={changedAppointment.startDate}
        endDate={changedAppointment.endDate}
        onStartDateValueChange={startDate => changeAppointmentField({
          change: { startDate: startDate.toDate() },
        })}
        onEndDateValueChange={endDate => changeAppointmentField({
          change: { endDate: endDate.toDate() },
        })}
        id={FULL_DATE_TIME_EDITOR}
      />
      <Label
        label={getMessage('moreInformationLabel')}
        id={TITLE_LABEL}
      />
      <TextEditor
        label={getMessage('additionalInformationLabel')}
        readOnly={readOnly}
        value={changedAppointment.additionalInformation}
        onValueChange={additionalInformation => changeAppointmentField({
          change: { additionalInformation },
        })}
      />
      <TextEditor
        label={getMessage('notesLabel')}
        readOnly={readOnly}
        id={NOTES_TEXT_EDITOR}
        value={changedAppointment.notes}
        onValueChange={notes => changeAppointmentField({ change: { notes } })}
      />
      <AllDay
        label={getMessage('allDayLabel')}
        readOnly={readOnly}
        value={changedAppointment.allDay}
        onValueChange={allDay => changeAppointmentField({ change: { allDay } })}
      />
      {
        (!changedAppointment.rRule) && (
          <React.Fragment>
            <Label
              label={getMessage('repeatLabel')}
              id={TITLE_LABEL}
            />
            <RecurrenceSwitcher />
          </React.Fragment>
        )
      }
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
  changeAppointmentField: PropTypes.func,
  changedAppointment: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
};

LayoutBase.defaultProps = {
  className: undefined,
  style: null,
  readOnly: false,
  changeAppointmentField: () => undefined,
};

export const Layout = withStyles(styles)(LayoutBase, { name: 'Layout' });
