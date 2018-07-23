import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Scheduler as SchedulerBase } from '@devexpress/dx-react-scheduler';
import { Root } from './templates/layout';

export const Scheduler = ({ children, ...props }) => (
  <SchedulerBase
    rootComponent={Root}
    {...props}
  >
    {children}
  </SchedulerBase>
);

Scheduler.Root = Root;

Scheduler.propTypes = {
  children: PropTypes.node.isRequired,
};

