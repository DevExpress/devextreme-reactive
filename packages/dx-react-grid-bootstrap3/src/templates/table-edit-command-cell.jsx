import React from 'react';
import PropTypes from 'prop-types';

export const CommandButton = ({ onExecute, text }) => (
  <button
    className="btn btn-link"
    onClick={(e) => {
      e.stopPropagation();
      onExecute();
    }}
  >
    {text}
  </button>
);

CommandButton.propTypes = {
  text: PropTypes.string.isRequired,
  onExecute: PropTypes.func.isRequired,
};

export const EditCommandHeadingCell = ({
  children,
  style,
}) => (
  <th
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
  >
    {children}
  </th>
);

EditCommandHeadingCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

EditCommandHeadingCell.defaultProps = {
  children: undefined,
  style: {},
};

export const EditCommandCell = ({
  children,
  style,
}) => (
  <td
    style={{
      whiteSpace: 'nowrap',
      textAlign: 'center',
      padding: 0,
      ...style,
    }}
  >
    {children}
  </td>
);

EditCommandCell.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  style: PropTypes.object,
};

EditCommandCell.defaultProps = {
  children: undefined,
  style: {},
};
