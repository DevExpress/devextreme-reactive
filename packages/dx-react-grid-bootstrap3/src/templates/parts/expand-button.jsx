import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'clsx';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const ExpandButton = ({
  visible, expanded, onToggle, className, style, ...restProps
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
        glyphicon: true,
        'glyphicon-triangle-bottom': expanded,
        'glyphicon-triangle-right': !expanded,
      }, className)}
      style={{
        cursor: visible ? 'pointer' : 'default',
        display: 'inline-block',
        fontSize: '9px',
        top: '0',
        padding: '8px',
        marginTop: '-8px',
        marginBottom: '-8px',
        opacity: visible ? 1 : 0,
        ...style,
      }}
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
  style: PropTypes.object,
};

ExpandButton.defaultProps = {
  visible: true,
  expanded: false,
  onToggle: () => {},
  className: undefined,
  style: null,
};
