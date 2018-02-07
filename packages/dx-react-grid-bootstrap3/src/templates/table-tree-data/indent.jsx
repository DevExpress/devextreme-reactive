import * as React from 'react';
import * as PropTypes from 'prop-types';

export const Indent = ({ level }) =>
  Array.from({ length: level })
    .map((_, currentLevel) => (
      <span
        // eslint-disable-next-line react/no-array-index-key
        key={currentLevel}
        style={{
          display: 'inline-block',
          marginRight: '16px',
        }}
      />
    ));

Indent.propTypes = {
  level: PropTypes.number,
};

Indent.defaultProps = {
  level: 0,
};
