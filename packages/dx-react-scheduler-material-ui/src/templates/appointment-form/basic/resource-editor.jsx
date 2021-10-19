import * as React from 'react';
import * as PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import classNames from 'clsx';
import { getAppointmentColor } from '../../utils';

const getResourceInstance = (resourceInstances, id) => resourceInstances
  .find(item => item.id === id);

const useStyles = makeStyles(({ spacing }) => ({
  select: {
    padding: spacing(1),
  },
  selectBox: {
    minHeight: spacing(6.5),
    width: '100%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    color: 'white',
    margin: 2,
  },
  resourceCircle: {
    height: spacing(2),
    width: spacing(2),
    borderRadius: '50%',
    marginRight: spacing(1),
  },
  itemContainer: {
    display: 'flex',
    padding: spacing(0.75),
  },
  circleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export const ResourceEditor = React.memo(({
  readOnly,
  resource,
  appointmentResources,
  onResourceChange,
  className,
  ...restProps
}) => {
  const classes = useStyles();

  const values = appointmentResources.reduce((acc, resourceItem) => (
    resourceItem.fieldName === resource.fieldName
      ? [...acc, resourceItem.id]
      : acc),
  []);

  const onChange = (nextValue) => {
    onResourceChange({ [resource.fieldName]: nextValue });
  };

  return (
    <TextField
      select
      disabled={readOnly}
      variant="outlined"
      margin="normal"
      value={values}
      SelectProps={{
        multiple: resource.allowMultiple,
        renderValue: (selected = []) => (
          resource.allowMultiple ? (
            <div className={classes.chips}>
              {selected.map((value) => {
                const resourceItem = getResourceInstance(resource.instances, value);
                return (
                  <Chip
                    key={value}
                    label={resourceItem.text}
                    className={classes.chip}
                    style={{ backgroundColor: getAppointmentColor(300, resourceItem.color) }}
                  />
                );
              })}
            </div>
          ) : (
            <div className={classes.itemContainer}>
              <div className={classes.circleContainer}>
                <div
                  className={classes.resourceCircle}
                  style={{
                    backgroundColor: getAppointmentColor(
                      400, getResourceInstance(resource.instances, selected[0]).color,
                    ),
                  }}
                />
              </div>
              {getResourceInstance(resource.instances, selected[0]).text}
            </div>
          )
        ),
      }}
      onChange={event => onChange(event.target.value)}
      className={classNames(classes.selectBox, className)}
      classes={{ select: classes.select }}
      {...restProps}
    >
      {
        resource.instances.map(resourceItem => (
          <MenuItem key={resourceItem.id} value={resourceItem.id}>
            <div
              className={classes.resourceCircle}
              style={{ backgroundColor: getAppointmentColor(400, resourceItem.color) }}
            />
            {resourceItem.text}
          </MenuItem>
        ))
      }
    </TextField>
  );
});

ResourceEditor.propTypes = {
  readOnly: PropTypes.bool,
  appointmentResources: PropTypes.array,
  onResourceChange: PropTypes.func,
  resource: PropTypes.object,
  className: PropTypes.string,
};

ResourceEditor.defaultProps = {
  className: undefined,
  readOnly: false,
  appointmentResources: [],
  onResourceChange: () => undefined,
  resource: {},
};
