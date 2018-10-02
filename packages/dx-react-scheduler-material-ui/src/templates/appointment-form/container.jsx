import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = {
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
};

export const ContainerBase = ({
  button: Button,
  editor: Editor,
  checkbox: Checkbox,
  classes,
  readOnly,
  onVisibilityChange,
}) => {
  const date = new Date('2018-10-2 10:35'); // stub
  return (
    <div>
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
    </div>
  );
};

ContainerBase.propTypes = {
  button: PropTypes.func,
  editor: PropTypes.func,
  checkbox: PropTypes.func,
  classes: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  onVisibilityChange: PropTypes.func,
};

ContainerBase.defaultProps = {
  button: () => undefined,
  editor: () => undefined,
  checkbox: () => undefined,
  readOnly: false,
  onVisibilityChange: () => undefined,
};

export const Container = withStyles(styles)(ContainerBase);
