import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';

const defaultMessages = {
  export: 'Export',
};

export const ExportPanelBase: React.SFC<any> = ({
  buttonComponent: Button,
  messages,
}) => (
  <Plugin
    name="ExportPanel"
    dependencies={[
      { name: 'Toolbar' },
      { name: 'GridExporter' },
    ]}
  >
    <Template name="toolbarContent">
      <TemplatePlaceholder />
      <TemplateConnector>
        {(_, { initiateExport, performExport }) => (
          <Button
            onClick={() => {
              initiateExport();
              window.setTimeout(performExport, 0);
            }}
            getMessage={getMessagesFormatter({ ...defaultMessages, ...messages })}
          />
        )}
      </TemplateConnector>
    </Template>
  </Plugin>
);

export const ExportPanel: React.ComponentType<any> = ExportPanelBase;
