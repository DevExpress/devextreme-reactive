import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin,
} from '@devexpress/dx-react-core';

const defaultMessages = {
  export: 'Export',
};

class ExportPanelBase extends React.PureComponent<any> {
  static components = {
    buttonComponent: 'ExportButton',
  };

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
        ]}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <Button
            onClick={startExport}
            getMessage={getMessagesFormatter({ ...defaultMessages, ...messages })}
          />
        </Template>
      </Plugin>
    );
  }
}

export const ExportPanel: React.ComponentType<any> = ExportPanelBase;
