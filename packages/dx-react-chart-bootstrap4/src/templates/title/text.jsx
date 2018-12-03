import * as React from 'react';
import { withClassName } from '../utils';

export const Text = withClassName(
  'w-100', 'text-center', 'mb-3',
)(({ text, ...restProps }) => <h3 {...restProps}>{text}</h3>);
