import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';

const defaultMessages = {
  export: 'Export',
};

class ExportPanelBase extends React.PureComponent<any> {
  static components = {
    buttonComponent: 'ExportButton',
  }

  render() {
    const {
      buttonComponent: Button,
      messages,
      startExport,
    } = this.props;

    return (
      <Plugin
        name="ExportPanel"
        dependencies={[
          { name: 'Toolbar' },
          // { name: 'Exporter' },
        ]}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {(/* _, { initiateExport, performExport } */) => (
              <Button
                onClick={() => {
                  startExport();
                  // initiateExport();
                  // window.setTimeout(performExport, 0);
                }}
                getMessage={getMessagesFormatter({ ...defaultMessages, ...messages })}
              />
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    )
  }
}

export const ExportPanel: React.ComponentType<any> = ExportPanelBase;
