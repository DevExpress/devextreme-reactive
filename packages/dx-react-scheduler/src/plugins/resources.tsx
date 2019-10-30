import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { attachResourcesBase } from '@devexpress/dx-scheduler-core';
import { ResourcesProps } from '../types/resources/resources.types';
import { checkPropTypes } from 'prop-types';

// const pluginDependencies = [
//   { name: 'Scheduler' },
// ];

const ResourcesBase: React.SFC<ResourcesProps> = ({
  data,
  mainResourceName,
  palette,
}) => {
  const attachResources = ({ appointments }: Getters) => {
    return attachResourcesBase(appointments, data, mainResourceName, palette);
  };

  return (
  <Plugin
    name="Resources"
    // dependencies={pluginDependencies}
  >
    <Getter name="appointments" computed={attachResources} />
  </Plugin>
  );
};

/** A plugin that manages schedule's resources. */
export const Resources: React.ComponentType<ResourcesProps> = ResourcesBase;
