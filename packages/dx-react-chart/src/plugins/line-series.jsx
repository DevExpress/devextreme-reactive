import * as React from 'react';
// import * as PropTypes from 'prop-types';

import {
  Template, Plugin,
} from '@devexpress/dx-react-core';

export const LineSeries = () => {
    return <Plugin
    name="LineSeries"
  >
    <Template name="pane">
      <circle cx="10" cy="10" r="8" fill="red" />
    </Template>
  </Plugin>};

