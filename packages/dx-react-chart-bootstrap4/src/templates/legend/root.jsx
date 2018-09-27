import * as React from 'react';
import { withClassName } from '../utils';

export const Root = withClassName('list-group', 'py-3')(
  props => <ul {...props} />,
);
