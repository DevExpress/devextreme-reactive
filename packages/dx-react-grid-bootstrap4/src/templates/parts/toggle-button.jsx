import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames';
import './toggle-button.css';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const ToggleButton = ({
  visible, expanded, onToggle, className, ...restProps
}) => {
  const fireToggle = () => {
    if (!visible) return;
    onToggle(!expanded);
  };
  const handleClick = (e) => {
    e.stopPropagation();
    fireToggle();
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === ENTER_KEY_CODE || e.keyCode === SPACE_KEY_CODE) {
      e.preventDefault();
      fireToggle();
    }
  };
  return (
    <i
      className={classNames({
        'oi p-2 text-center dx-rg-bs4-toggle-button': true,
        'oi-chevron-bottom': expanded,
        'oi-chevron-right': !expanded,
        'dx-rg-bs4-transparent': !visible,
      }, className)}
      tabIndex={visible ? 0 : undefined} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
      onBlur={handleBlur}
      onClick={handleClick}
      {...restProps}
    />
  );
};

ToggleButton.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

ToggleButton.defaultProps = {
  visible: true,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};
