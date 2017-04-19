import React from 'react';

import { FullFeaturedControlledDemo } from './full-featured/full-featured-controlled';
import { FullFeaturedUncontrolledDemo } from './full-featured/full-featured-uncontrolled';
import { UncontrolledVirtualDemo } from './full-featured/uncontrolled-virtual';
import { UncontrolledGroupedVirtualDemo } from './full-featured/uncontrolled-grouped-virtual';
import { FullFeaturedCustomizedDemo } from './full-featured/full-featured-customized';

export const FullFeaturedDemos = () => (
  <div>
    <h2>Full Featured Demos</h2>
    <FullFeaturedControlledDemo />
    <FullFeaturedUncontrolledDemo />
    <UncontrolledVirtualDemo />
    <UncontrolledGroupedVirtualDemo />
    <FullFeaturedCustomizedDemo />
  </div>
);
