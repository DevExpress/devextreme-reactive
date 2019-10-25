import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { attachResourcesBase } from '@devexpress/dx-scheduler-core';
import { ResourcesProps } from '../types/resources/resources.types';

// const pluginDependencies = [
//   { name: 'EditingState' },
//   { name: 'EditRecurrenceMenu', optional: true },
//   { name: 'IntegratedEditing', optional: true },
// ];

const ResourcesBase: React.SFC<ResourcesProps> = ({
  data,
  mainResourceName,
}) => {
  const attachResources = ({ appointments }: Getters) =>
    attachResourcesBase(appointments, data, mainResourceName);

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
