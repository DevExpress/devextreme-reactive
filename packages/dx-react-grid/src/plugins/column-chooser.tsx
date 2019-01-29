import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector, PluginComponents,
} from '@devexpress/dx-react-core';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { Column } from '../column';
import { ColumnChooser as ColumnChooserComponents } from './column-chooser-components';

const pluginDependencies = [
  { name: 'TableColumnVisibility' },
  { name: 'Toolbar' },
];

export interface ColumnChooserItem {
  /** The grid column associated with the item. */
  column: Column;
  /** Specifies whether the associated column is hidden. */
  hidden: boolean;
}

export interface ColumnChooserProps {
  /** A component that renders the column chooser overlay. */
  overlayComponent: React.ComponentType<ColumnChooserComponents.OverlayProps>;
  /** A component that renders a button that invokes the column chooser. */
  toggleButtonComponent: React.ComponentType<ColumnChooserComponents.ToggleButtonProps>;
  /** A component that renders the column chooser container. */
  containerComponent: React.ComponentType<ColumnChooserComponents.ContainerProps>;
  /** A component that renders a column chooser item. */
  itemComponent: React.ComponentType<ColumnChooserComponents.ItemProps>;
  /** An object that specifies localization messages. */
  messages?: ColumnChooserComponents.LocalizationMessages;
}

interface ColumnChooserState {
  visible: boolean;
}

export class ColumnChooser extends React.PureComponent<
  ColumnChooserProps, ColumnChooserState
> {
  static components: PluginComponents;
  button!: React.ReactInstance;

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.setButtonRef = this.setButtonRef.bind(this);
  }

  setButtonRef(button) {
    this.button = button;
  }

  handleToggle() {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  }

  handleHide() {
    this.setState({ visible: false });
  }

  render() {
    const {
      overlayComponent: Overlay,
      containerComponent: Container,
      itemComponent: Item,
      toggleButtonComponent: ToggleButton,
      messages,
    } = this.props;
    const getMessage = getMessagesFormatter(messages);
    const { visible } = this.state;

    return (
      <Plugin
        name="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent">
          <TemplatePlaceholder />
          <TemplateConnector>
            {(
              { columns, hiddenColumnNames, isColumnTogglingEnabled },
              { toggleColumnVisibility },
            ) => (
              <React.Fragment>
                <ToggleButton
                  buttonRef={this.setButtonRef}
                  onToggle={this.handleToggle}
                  getMessage={getMessage}
                  active={visible}
                />
                <Overlay
                  visible={visible}
                  target={this.button}
                  onHide={this.handleHide}
                >
                  <Container>
                    {columnChooserItems(columns, hiddenColumnNames)
                      .map((item) => {
                        const { name: columnName } = item.column;
                        const togglingEnabled = isColumnTogglingEnabled(columnName);
                        return (
                          <Item
                            key={columnName}
                            item={item}
                            disabled={!togglingEnabled}
                            onToggle={() => toggleColumnVisibility(columnName)}
                          />
                        );
                      })}
                  </Container>
                </Overlay>
              </React.Fragment>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

ColumnChooser.components = {
  overlayComponent: 'Overlay',
  containerComponent: 'Container',
  itemComponent: 'Item',
  toggleButtonComponent: 'ToggleButton',
};
