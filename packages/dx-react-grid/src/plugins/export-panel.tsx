import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import { ExportPanelProps, ExportPanelState } from '../types';

const defaultMessages = {
  showExportMenu: 'Export',
  exportAll: 'Export all data',
  exportSelected: 'Export selected rows',
};

class ExportPanelBase extends React.PureComponent<ExportPanelProps, ExportPanelState> {
  static components = {
    toggleButtonComponent: 'ToggleButton',
    menuComponent: 'Menu',
    menuItemComponent: 'MenuItem',
  };
  button!: React.ReactInstance;
  state = { visible: false };

  setButtonRef = button => this.button = button;

  handleToggle = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }

  handleHide = () => this.setState({ visible: false });

  render() {
    const {
      toggleButtonComponent: ToggleButton,
      menuComponent: Menu,
      menuItemComponent: MenuItem,
      messages,
      startExport,
    } = this.props;
    const {
      visible,
    } = this.state;

    const getMessage = getMessagesFormatter({ ...defaultMessages, ...messages });

    return (
      <Plugin
        name="ExportPanel"
        dependencies={[
          { name: 'SelectionState', optional: true },
          { name: 'Toolbar' },
        ]}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {({ selection }) => (
              <>
                <ToggleButton
                  buttonRef={this.setButtonRef}
                  onToggle={this.handleToggle}
                  getMessage={getMessage}
                />
                <Menu
                  visible={visible}
                  onHide={this.handleHide}
                  target={this.button}
                >
                  <MenuItem
                    key="exportAll"
                    text={getMessage('exportAll')}
                    onClick={() => {
                      this.handleHide();
                      startExport();
                    }}
                  />
                  {selection?.length ? (
                    <MenuItem
                      key="exportSelected"
                      text={getMessage('exportSelected')}
                      onClick={() => {
                        this.handleHide();
                        startExport({ selectedOnly: true });
                      }}
                    />
                  ) : null}
                </Menu>
              </>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

export const ExportPanel: React.ComponentType<any> = ExportPanelBase;
