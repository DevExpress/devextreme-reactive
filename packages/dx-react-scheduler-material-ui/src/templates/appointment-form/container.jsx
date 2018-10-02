import * as React from 'react';
import * as PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

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
  paper: {
    width: theme.spacing.unit * 50,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
    paddingTop: theme.spacing.unit * 2,
    margin: '0 auto',
    transform: 'translateY(20%)',
  },
});

export const ContainerBase = ({
  button: Button,
  editor: Editor,
  checkbox: Checkbox,
  classes,
  readOnly,
  onVisibilityChange,
  onAppointmentChange,
  ...restProps
}) => {
  const date = new Date('2018-10-2 10:35'); // stub
  return (
    <Paper className={classes.paper} {...restProps}>
      <div className={classes.scrolableSpace}>
        <Editor
          label="Subject"
          value="Install New Databases"
          readOnly={readOnly}
        />
        <Editor
          label="Start Date"
          type="datetime-local"
          value={date.toISOString().slice(0, -8)}
          readOnly={readOnly}
        />
        <Editor
          label="End Date"
          type="datetime-local"
          value={date.toISOString().slice(0, -8)}
          readOnly={readOnly}
        />
        <Checkbox
          text="All Day"
          readOnly={readOnly}
        />
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
    </Paper>
  );
};

ContainerBase.propTypes = {
  button: PropTypes.func,
  editor: PropTypes.func,
  checkbox: PropTypes.func,
  classes: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
  onAppointmentChange: PropTypes.func,
};

ContainerBase.defaultProps = {
  button: () => undefined,
  editor: () => undefined,
  checkbox: () => undefined,
  readOnly: false,
  onVisibilityChange: () => undefined,
  onAppointmentChange: () => undefined,
};

export const Container = withStyles(styles)(ContainerBase);
