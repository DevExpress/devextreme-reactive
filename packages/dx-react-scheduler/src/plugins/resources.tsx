import * as React from 'react';
import { Plugin, Getter, Template, TemplatePlaceholder, TemplateConnector, Getters } from '@devexpress/dx-react-core';
import { convertResourcesToPlain, validateResources, attachResources } from '@devexpress/dx-scheduler-core';
import { ResourcesProps } from '../types/resources/resources.types';

const pluginDependencies = [
  { name: 'Appointments' },
];

const ResourcesBase: React.SFC<ResourcesProps> = ({
  data, mainResourceName, palette,
}) => {
  // const resourcesData = validateResources(data, mainResourceName, palette);
  const convertResources = ({ resources }: Getters) =>
    convertResourcesToPlain(resources);

  return (
  <Plugin
    name="Resources"
    dependencies={pluginDependencies}
  >
    <Getter name="resources" value={validateResources(data, mainResourceName, palette)} />
    <Getter name="plainResources" computed={convertResources} />

    <Template name="appointment">
      {params => (
        <TemplateConnector>
          {({ resources, plainResources }) => {
            return (
              <TemplatePlaceholder
                params={{
                  ...params,
                  resources: attachResources(params.data, resources, plainResources).resources,
                }}
              />
            );
          }}
        </TemplateConnector>
      )}
    </Template>
  </Plugin>
  );
};

/** A plugin that manages schedule's resources. */
export const Resources: React.ComponentType<ResourcesProps> = ResourcesBase;
