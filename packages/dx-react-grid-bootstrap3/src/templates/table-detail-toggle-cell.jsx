import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY_CODE = 13;
const SPACE_KEY_CODE = 32;

const handleMouseDown = (e) => { e.target.style.outline = 'none'; };
const handleBlur = (e) => { e.target.style.outline = ''; };

export const TableDetailToggleCell = ({ style, expanded, toggleExpanded }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === ENTER_KEY_CODE || event.keyCode === SPACE_KEY_CODE) {
      event.preventDefault();
      toggleExpanded();
    }
  };
  return (
    <td
      style={{
        cursor: 'pointer',
        ...style,
      }}
      onClick={() => {
        toggleExpanded();
      }}

    >
      <i
        className={`glyphicon glyphicon-triangle-${expanded ? 'bottom' : 'right'}`}
        style={{
          fontSize: '9px',
          top: '0',
        }}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
        onKeyDown={handleKeyDown}
        onMouseDown={handleMouseDown}
        onBlur={handleBlur}
      />
    </td>
  );
};

TableDetailToggleCell.propTypes = {
  style: PropTypes.object,
  expanded: PropTypes.bool,
  toggleExpanded: PropTypes.func,
};

TableDetailToggleCell.defaultProps = {
  style: null,
  expanded: false,
  toggleExpanded: () => {},
};
