import * as React from 'react';
import { Plugin, Getter, Getters } from '@devexpress/dx-react-core';
import {
  convertResourcesToPlain, validateResources, addResourcesToAppointments,
} from '@devexpress/dx-scheduler-core';
import { ResourcesProps } from '../types/resources/resources.types';
import { memoize } from '@devexpress/dx-core';

const pluginDependencies = [
  { name: 'Appointments' },
];

const addResourcesToTimeTableAppointments = memoize(({
  timeTableAppointments, resources, plainResources,
}) => timeTableAppointments
  && addResourcesToAppointments(timeTableAppointments[0], resources, plainResources));
const addResourcesToAllDayAppointments = memoize(({
    allDayAppointments, resources, plainResources,
  }) => allDayAppointments
    && addResourcesToAppointments(allDayAppointments[0], resources, plainResources));

const ResourcesBase: React.SFC<ResourcesProps> = React.memo(({
  data, mainResourceName, palette,
}) => {
  const convertResources = ({ resources }: Getters) =>
    convertResourcesToPlain(resources);

  return (
  <Plugin
    name="Resources"
    dependencies={pluginDependencies}
  >
    <Getter name="resources" value={validateResources(data, mainResourceName, palette)} />
    <Getter name="plainResources" computed={convertResources} />
    <Getter name="timeTableAppointments" computed={addResourcesToTimeTableAppointments} />
    <Getter name="allDayAppointments" computed={addResourcesToAllDayAppointments} />
  </Plugin>
  );
});

/** A plugin that manages schedule's resources. */
export const Resources: React.ComponentType<ResourcesProps> = ResourcesBase;
