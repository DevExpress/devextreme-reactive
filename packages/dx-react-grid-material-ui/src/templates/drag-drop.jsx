import React from 'react';
import PropTypes from 'prop-types';

import { Chip } from 'material-ui';

export const Container = ({
  clientOffset, columns, columnTemplate,
}) => (
  <div
    style={{
      position: 'fixed',
      zIndex: 1000,
      left: 0,
      top: 0,
      display: 'inline-block',
      transform: `translate(calc(${clientOffset.x}px - 50%), calc(${clientOffset.y}px - 50%))`,
    }}
  >
    {columns
      .map(column => React.cloneElement(
        columnTemplate({ column }),
        { key: column.name },
      ))}
  </div>
);

Container.propTypes = {
  clientOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  columns: PropTypes.array.isRequired,
  columnTemplate: PropTypes.func.isRequired,
};

export const Column = ({ column }) => (
  <Chip label={column.title} />
);

Column.propTypes = {
  column: PropTypes.shape().isRequired,
};
