import * as React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  scrolableSpace: {
    maxHeight: '400px',
    overflowY: 'scroll',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  inputGroup: {
    width: '100%',
    display: 'flex',
  },
  allDayText: {
    paddingTop: theme.spacing.unit * 1.5,
  },
});

export const ContainerBase = ({
  children,
  button: Button,
  editor: Editor,
  classes,
  appointment,
  readOnly,
  onVisibilityChange,
  onAppointmentChange,
}) => {
  const date = new Date('2018-10-2 10:35');
  return (
    <div>
      <div className={classes.scrolableSpace}>
        <Editor
          placeholder="Subject"
          value="Install New Databases"
          readOnly={readOnly}
        />
        <Editor
          placeholder="Start Date"
          type="datetime-local"
          value={date.toISOString().slice(0, -8)}
          readOnly={readOnly}
        />
        <Editor
          placeholder="End Date"
          type="datetime-local"
          value={date.toISOString().slice(0, -8)}
          readOnly={readOnly}
        />
        <div className={classes.inputGroup}>
          <Checkbox
            color="primary"
            disabled={readOnly}
          />
          <Typography
            className={classes.allDayText}
            variant="subheading"
          >
            All Day
          </Typography>
        </div>
      </div>
      <div className={classes.buttonGroup}>
        <Button
          text="cancel"
          onClick={onVisibilityChange}
        />
        <Button
          text="save"
          readOnly={readOnly}
          onClick={onVisibilityChange}
        />
      </div>
    </div>
  );
};

export const Container = withStyles(styles)(ContainerBase);
