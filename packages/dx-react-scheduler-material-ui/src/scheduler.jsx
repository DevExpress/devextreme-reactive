import * as React from 'react';
import PropTypes from 'prop-types';
import { Scheduler as SchedulerBase } from '@devexpress/dx-react-scheduler';
import { Root } from './templates/layout';

export const Scheduler = ({ children, ...restProps }) => (
  <SchedulerBase
    rootComponent={Root}
    {...restProps}
  >
    {children}
  </SchedulerBase>
);

Scheduler.Root = Root;

Scheduler.propTypes = {
  children: PropTypes.node.isRequired,
};
