import * as React from 'react';
import { withClassName } from '../utils';

export const Label = withClassName('text-body', 'pl-2', 'pr-2')(
  ({ text, ...restProps }) => (<span {...restProps}>{text}</span>),
);
