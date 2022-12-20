import * as React from 'react';
import {
  styled, TextField, MenuItem, Chip,
} from '@mui/material';
import PropTypes from 'prop-types';
import classNames from 'clsx';
import { getAppointmentColor } from '../../utils';

const PREFIX = 'ResourceEditor';

const classes = {
  select: `${PREFIX}-select`,
  selectBox: `${PREFIX}-selectBox`,
  chips: `${PREFIX}-chips`,
  chip: `${PREFIX}-chip`,
  resourceCircle: `${PREFIX}-resourceCircle`,
  itemContainer: `${PREFIX}-itemContainer`,
  circleContainer: `${PREFIX}-circleContainer`,
};

const StyledTextField = styled(TextField)(({ theme: { spacing } }) => ({
  [`&.${classes.select}`]: {
    padding: spacing(1),
  },
  [`&.${classes.selectBox}`]: {
    minHeight: spacing(6.5),
    width: '100%',
  },
}));

const StyledDiv = styled('div')(({ theme: { spacing } }) => ({
  [`&.${classes.resourceCircle}`]: {
    height: spacing(2),
    width: spacing(2),
    borderRadius: '50%',
    marginRight: spacing(1),
  },
  [`&.${classes.itemContainer}`]: {
    display: 'flex',
    padding: spacing(0.75),
  },
  [`& .${classes.circleContainer}`]: {
    display: 'flex',
    alignItems: 'center',
  },
  [`&.${classes.chips}`]: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  [`& .${classes.chip}`]: {
    color: 'white',
    margin: 2,
  },
}));

const getResourceInstance = (resourceInstances, id) => resourceInstances
  .find(item => item.id === id);

export const ResourceEditor = React.memo(({
  readOnly,
  resource,
  appointmentResources,
  onResourceChange,
  className,
  ...restProps
}) => {
  const values = appointmentResources.reduce((acc, resourceItem) => (
    resourceItem.fieldName === resource.fieldName
      ? [...acc, resourceItem.id]
      : acc),
  []);

  const onChange = (nextValue) => {
    onResourceChange({ [resource.fieldName]: nextValue });
  };

  return (
    <StyledTextField
      select
      disabled={readOnly}
      variant="outlined"
      margin="normal"
      value={values}
      SelectProps={{
        multiple: resource.allowMultiple,
        renderValue: (selected = []) => (
          resource.allowMultiple ? (
            <StyledDiv className={classes.chips}>
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
            </StyledDiv>
          ) : (
            <StyledDiv className={classes.itemContainer}>
              <div className={classes.circleContainer}>
                <StyledDiv
                  className={classes.resourceCircle}
                  style={{
                    backgroundColor: getAppointmentColor(
                      400, getResourceInstance(resource.instances, selected[0]).color,
                    ),
                  }}
                />
              </div>
              {getResourceInstance(resource.instances, selected[0]).text}
            </StyledDiv>
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
            <StyledDiv
              className={classes.resourceCircle}
              style={{ backgroundColor: getAppointmentColor(400, resourceItem.color) }}
            />
            {resourceItem.text}
          </MenuItem>
        ))
      }
    </StyledTextField>
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
