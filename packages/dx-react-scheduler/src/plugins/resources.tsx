import * as React from 'react';
import { Plugin, Getter, Getters, Template, TemplatePlaceholder, TemplateConnector } from '@devexpress/dx-react-core';
import { attachResourcesBase, convertResourcesToPlain, validateResources, attachResources } from '@devexpress/dx-scheduler-core';
import { ResourcesProps } from '../types/resources/resources.types';

const pluginDependencies = [
  { name: 'Appointments' },
];

const ResourcesBase: React.SFC<ResourcesProps> = ({
  data,
  mainResourceName,
  palette,
}) => {
  const attachResources2 = ({ appointments, resources }: Getters) => {
    return attachResourcesBase(appointments, resources, mainResourceName, palette);
  };

  return (
  <Plugin
    name="Resources"
    dependencies={pluginDependencies}
  >
    <Getter name="resources" value={validateResources(data, mainResourceName, palette)} />
    <Getter
      name="plainResources"
      value={convertResourcesToPlain(data, mainResourceName, palette)}
    />
    {/* <Getter name="appointments" computed={attachResources2} /> */}

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

{/* // ??? */}
    <Template name="appointmentContent">
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
