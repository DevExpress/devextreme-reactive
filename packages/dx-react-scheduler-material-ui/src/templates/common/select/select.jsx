import * as React from 'react';
import PropTypes from 'prop-types';
import { STANDARD_SELECT } from '@devexpress/dx-scheduler-core';
import { FilledSelect } from './filled-select';
import { OutlinedSelect } from './outlined-select';

export const Select = React.memo(({
  value,
  availableOptions,
  onValueChange,
  readOnly,
  type,
  ...restProps
}) => {
  const ResultingSelect = type === STANDARD_SELECT ? FilledSelect : OutlinedSelect;

  return (
    <ResultingSelect
      value={value}
      availableOptions={availableOptions}
      onValueChange={onValueChange}
      readOnly={readOnly}
      {...restProps}
    />
  );
});

Select.propTypes = {
  onValueChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  availableOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string.isRequired,
  })),
  readOnly: PropTypes.bool,
  type: PropTypes.string,
};

Select.defaultProps = {
  readOnly: false,
  availableOptions: [],
  type: STANDARD_SELECT,
};
