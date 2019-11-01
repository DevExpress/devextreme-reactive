import * as React from 'react';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import MuiSelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

export const ResourcesEditors = React.memo(({
  readOnly,
  resources,
  appointmentResources,
  onResourceChange,
  labelComponent: Label,
}) => {
  const classes = useStyles();
  const appointmentResourceItems = [...appointmentResources];

  return resources.map((resource) => {
    const values = appointmentResources.reduce((acc, resourceItem) => (
      resourceItem.fieldName === resource.fieldName
        ? [...acc, resourceItem.id]
        : acc),
    []);

    const onChange = (nextValue) => {
      const nextIds = resource.allowMultiple ? nextValue : [nextValue];
      const nextApptResources = resources.reduce((acc, groupItems) => {
        if (groupItems.fieldName === resource.fieldName) {
          return [...acc, ...resource.items.filter(item => nextIds.includes(item.id))];
        }
        return [
          ...acc,
          ...groupItems.items.filter(item => appointmentResourceItems.findIndex(apptItems => apptItems.id === item.id) !== -1),
        ];
      }, []);
      onResourceChange({ resources: nextApptResources });
      onResourceChange({ [resource.fieldName]: nextValue });
    };

    return (
      <React.Fragment key={resource.fieldName}>
        <Label
          text={resource.title}
          type={TITLE}
          className={classes.labelWithMargins}
        />
        <MuiSelect
          readOnly={readOnly}
          variant="outlined"
          value={values}
          multiple={resource.allowMultiple}
          onChange={(event) => { onChange(event.target.value); }}
          className={classes.selectBox}
          classes={{ select: classes.select }}
          renderValue={selected => (
            resource.allowMultiple ? (
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
            ) : (
              <div className={classes.itemContainer}>
                <div className={classes.circleContainer}>
                  <div
                    className={classes.resourceCircle}
                    style={{
                      backgroundColor: getAppointmentColor(
                        400, getResourceItem(resource.items, selected[0]).color,
                      ),
                    }}
                  />
                </div>
                {getResourceItem(resource.items, selected[0]).text}
              </div>
            )
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
});

ResourcesEditors.propTypes = {
  labelComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
  readOnly: PropTypes.bool,
  appointmentResources: PropTypes.array,
  onResourceChange: PropTypes.func,
  resources: PropTypes.array,
};

ResourcesEditors.defaultProps = {
  readOnly: false,
  appointmentResources: [],
  onResourceChange: () => undefined,
  resources: [],
};
