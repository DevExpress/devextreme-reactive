import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const ExpandButton = ({
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
        'oi p-2 text-center dx-g-bs4-toggle-button': true,
        'oi-chevron-bottom': expanded,
        'oi-chevron-right': !expanded,
        'dx-g-bs4-toggle-button-hidden': !visible,
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

ExpandButton.propTypes = {
  visible: PropTypes.bool,
  expanded: PropTypes.bool,
  onToggle: PropTypes.func,
  className: PropTypes.string,
};

ExpandButton.defaultProps = {
  visible: true,
  expanded: false,
  onToggle: () => {},
  className: undefined,
};
