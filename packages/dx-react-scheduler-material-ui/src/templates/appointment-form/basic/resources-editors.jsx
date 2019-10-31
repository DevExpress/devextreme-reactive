import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import classNames from 'clsx';
import { TITLE } from '@devexpress/dx-scheduler-core';
import { getAppointmentColor } from '../../utils';

const getResourceItem = (resourceItems, id) => resourceItems.find(item => item.id === id);

const useStyles = makeStyles(({ spacing }) => ({
  abelWithMargins: {
    marginBottom: spacing(0.5),
    marginTop: spacing(0.5),
  },
  select: {
    padding: spacing(1),
  },
  selectBox: {
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
    height: spacing(1.5),
    width: spacing(1.5),
    borderRadius: '50%',
    marginRight: spacing(1),
  },
}));

export const ResourcesEditors = ({
  resources,
  appointmentData,
  labelComponent: Label,
}) => {
  const classes = useStyles();

  return resources.map((resource) => {
    const values = appointmentData.resources.reduce((acc, resourceItem) => (
      resourceItem.fieldName === resource.fieldName
        ? [...acc, resourceItem.id]
        : acc),
    []);
    return (
      <React.Fragment key={resource.fieldName}>
        <Label
          text={resource.title}
          type={TITLE}
          className={classes.labelWithMargins}
        />
        {console.log(resource.items)}
        <MuiSelect
          variant="outlined"
          value={values}
          multiple={resource.allowMultiple}
          onValueChange={() => undefined}
          className={classes.selectBox}
          classes={{ select: classes.select }}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map((value) => {
                const resourceItem = getResourceItem(resource.items, value);
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
          )}
        >
          {resource.items.map(resourceItem => (
            <MenuItem key={resourceItem.id} value={resourceItem.id}>
              <div
                className={classes.resourceCircle}
                style={{ backgroundColor: getAppointmentColor(400, resourceItem.color) }}
              />
              {resourceItem.text}
            </MenuItem>
          ))}
        </MuiSelect>
      </React.Fragment>
    );
  });
};
