import * as React from 'react';
import * as PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const ToggleButton = ({
  visible, expanded, onToggle,
  className,
  ...restProps
}) => {
  const handleClick = (e) => {
    e.stopPropagation();
    onToggle();
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) {
      e.preventDefault();
      onToggle();
    }
  };
  return (visible ? (
    <i
      className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`}
      style={{
        display: 'inline-block',
        fontSize: '9px',
        top: '0',
        padding: '5px',
        marginTop: '-5px',
        marginBottom: '-5px',
        marginRight: '8px',
      }}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onClick={handleClick}
      {...restProps}
    />
  ) : (
    <span
      style={{
        display: 'inline-block',
        width: '19px',
        marginRight: '8px',
      }}
    />
  ));
};

ToggleButton.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  visible: false,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};
