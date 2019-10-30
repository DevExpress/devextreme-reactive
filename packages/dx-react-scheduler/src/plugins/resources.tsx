import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import { attachResourcesBase, convertResourcesToPlain, validateResources } from '@devexpress/dx-scheduler-core';
import { ResourcesProps } from '../types/resources/resources.types';

// const pluginDependencies = [
//   { name: 'Scheduler' },
// ];

const ResourcesBase: React.SFC<ResourcesProps> = ({
  data,
  mainResourceName,
  palette,
}) => {
  const attachResources = ({ appointments, resources }: Getters) => {
    return attachResourcesBase(appointments, resources, mainResourceName, palette);
  };

  return (
  <Plugin
    name="Resources"
    // dependencies={pluginDependencies}
  >
    <Getter name="resources" value={validateResources(data, mainResourceName, palette)} />
    <Getter
      name="planeResources"
      value={convertResourcesToPlain(data, mainResourceName, palette)}
    />
    <Getter name="appointments" computed={attachResources} />
  </Plugin>
  );
};

/** A plugin that manages schedule's resources. */
export const Resources: React.ComponentType<ResourcesProps> = ResourcesBase;
