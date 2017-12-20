import React from 'react';
import PropTypes from 'prop-types';
import { IconButton, Tooltip } from 'material-ui';
import { VisibilityOff } from 'material-ui-icons';


export class ToggleButton extends React.PureComponent {
  render() {
    const {
      onToggle,
      getMessage,
      ...restProps
    } = this.props;

    return (
      <Tooltip
        title={getMessage('hiddenColumns')}
        placement="bottom-end"
        enterDelay={300}
        {...restProps}
      >
        <IconButton
          onClick={onToggle}
        >
          <VisibilityOff />
        </IconButton>
      </Tooltip>
    );
  }
}

ToggleButton.propTypes = {
  onToggle: PropTypes.func.isRequired,
  getMessage: PropTypes.func.isRequired,
};
