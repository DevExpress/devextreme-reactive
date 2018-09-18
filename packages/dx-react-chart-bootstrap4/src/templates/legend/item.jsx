import * as React from 'react';
import { withClassName } from '../utils';

export const Item = withClassName(
  'd-flex', 'list-group-item', 'border-0', 'py-1', 'px-4', 'align-items-center',
)(props => <li {...props} />);
