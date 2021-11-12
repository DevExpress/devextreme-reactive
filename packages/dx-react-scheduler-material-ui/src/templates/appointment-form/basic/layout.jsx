import * as React from 'react';
import { styled } from '@mui/material/styles';
import * as PropTypes from 'prop-types';
import classNames from 'clsx';
import Grid from '@mui/material/Grid';
import {
  TITLE_TEXT_EDITOR,
  MULTILINE_TEXT_EDITOR,
  TITLE,
  REPEAT_TYPES,
  handleChangeFrequency,
} from '@devexpress/dx-scheduler-core';
import { TRANSITIONS_TIME, LAYOUT_MEDIA_QUERY } from '../../constants';

const PREFIX = 'Layout';

export const classes = {
  root: `${PREFIX}-root`,
  fullSize: `${PREFIX}-fullSize`,
  halfSize: `${PREFIX}-halfSize`,
  labelWithMargins: `${PREFIX}-labelWithMargins`,
  notesEditor: `${PREFIX}-notesEditor`,
  dateEditor: `${PREFIX}-dateEditor`,
  dividerLabel: `${PREFIX}-dividerLabel`,
  booleanEditors: `${PREFIX}-booleanEditors`,
  dateEditors: `${PREFIX}-dateEditors`,
};

const StyledDiv = styled('div')(({
  theme: { spacing, typography },
}) => ({
  [`&.${classes.root}`]: {
    width: '650px',
    paddingTop: spacing(3),
    paddingBottom: spacing(3),
    paddingLeft: spacing(4),
    paddingRight: spacing(4),
    boxSizing: 'border-box',
    transition: `all ${TRANSITIONS_TIME}ms cubic-bezier(0, 0, 0.2, 1)`,
    [`${LAYOUT_MEDIA_QUERY}`]: {
      width: '100%',
      maxWidth: '700px',
      paddingRight: spacing(2),
      paddingLeft: spacing(2),
      paddingBottom: 0,
    },
  },
  [`&.${classes.fullSize}`]: {
    paddingBottom: spacing(3),
  },
  [`&.${classes.halfSize}`]: {
    '@media (min-width: 700px) and (max-width: 850px)': {
      width: '400px',
    },
    '@media (min-width: 850px) and (max-width: 1000px)': {
      width: '480px',
    },
    '@media (min-width: 1000px) and (max-width: 1150px)': {
      width: '560px',
    },
  },
  [`& .${classes.labelWithMargins}`]: {
    marginTop: spacing(2),
  },
  [`& .${classes.notesEditor}`]: {
    marginBottom: spacing(0.5),
    marginTop: spacing(0.5),
  },
  [`& .${classes.dateEditor}`]: {
    width: '45%',
    paddingTop: '0px!important',
    marginTop: spacing(2),
    paddingBottom: '0px!important',
    marginBottom: 0,
  },
  [`& .${classes.dividerLabel}`]: {
    ...typography.body2,
    width: '10%',
    textAlign: 'center',
    paddingTop: spacing(2),
  },
  [`& .${classes.booleanEditors}`]: {
    marginTop: spacing(0.875),
  },
  '@media (max-width: 570px)': {
    [`& .${classes.dateEditors}`]: {
      flexDirection: 'column',
    },
    [`& .${classes.booleanEditors}`]: {
      flexDirection: 'column',
      marginTop: spacing(1.875),
    },
    [`& .${classes.dateEditor}`]: {
      width: '100%',
      '&:first-of-type': {
        marginBottom: 0,
      },
      '&:last-child': {
        marginTop: spacing(2),
      },
    },
    [`& .${classes.dividerLabel}`]: {
      display: 'none',
    },
  },
}));

const LayoutBase = ({
  children,
  locale,
  className,
  getMessage,
  readOnly,
  onFieldChange,
  appointmentData,
  fullSize,
  resources,
  appointmentResources,
  textEditorComponent: TextEditor,
  dateEditorComponent: DateEditor,
  selectComponent: Select,
  labelComponent: Label,
  booleanEditorComponent: BooleanEditor,
  resourceEditorComponent: ResourceEditor,
  ...restProps
}) => {
  const changeTitle = React.useCallback(title => onFieldChange({ title }), [onFieldChange]);
  const changeNotes = React.useCallback(notes => onFieldChange({ notes }), [onFieldChange]);
  const changeStartDate = React.useCallback(
    startDate => onFieldChange({ startDate }), [onFieldChange],
  );
  const changeEndDate = React.useCallback(endDate => onFieldChange({ endDate }), [onFieldChange]);
  const changeAllDay = React.useCallback(allDay => onFieldChange({ allDay }), [onFieldChange]);
  const changeResources = React.useCallback(resource => onFieldChange(resource), [onFieldChange]);

  const { rRule, startDate } = appointmentData;
  const changeFrequency = React.useCallback(value => handleChangeFrequency(
    value ? REPEAT_TYPES.DAILY : REPEAT_TYPES.NEVER, rRule, startDate, onFieldChange,
  ), [rRule, startDate, onFieldChange]);

  return (
    <StyledDiv
      className={classNames({
        [classes.root]: true,
        [classes.fullSize]: fullSize,
        [classes.halfSize]: !fullSize,
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
          excludeTime={appointmentData.allDay}
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
          excludeTime={appointmentData.allDay}
        />
      </Grid>
      <Grid
        container
        className={classes.booleanEditors}
      >
        <BooleanEditor
          label={getMessage('allDayLabel')}
          readOnly={readOnly}
          value={appointmentData.allDay}
          onValueChange={changeAllDay}
        />
        <BooleanEditor
          label={getMessage('repeatLabel')}
          readOnly={readOnly}
          value={!!appointmentData.rRule}
          onValueChange={changeFrequency}
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
      {resources.map(resource => (
        <React.Fragment key={resource.fieldName}>
          <ResourceEditor
            label={resource.title}
            readOnly={readOnly}
            resource={resource}
            appointmentResources={appointmentResources}
            onResourceChange={changeResources}
          />
        </React.Fragment>
      ))}

      {children}
    </StyledDiv>
  );
};

LayoutBase.propTypes = {
  textEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  dateEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  selectComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  booleanEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  resourceEditorComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  locale: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]).isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
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
  resources: PropTypes.array,
  appointmentResources: PropTypes.array,
  readOnly: PropTypes.bool,
  fullSize: PropTypes.bool.isRequired,
};

LayoutBase.defaultProps = {
  onFieldChange: () => undefined,
  resources: [],
  appointmentResources: [],
  className: undefined,
  readOnly: false,
  children: null,
};

export const Layout = (LayoutBase);
