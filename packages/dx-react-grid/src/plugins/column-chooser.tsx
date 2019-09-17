import * as React from 'react';
import { getMessagesFormatter } from '@devexpress/dx-core';
import {
  Template, TemplatePlaceholder, Plugin, TemplateConnector,
} from '@devexpress/dx-react-core';
import { columnChooserItems } from '@devexpress/dx-grid-core';
import { ColumnChooserState, ColumnChooserProps } from '../types';

const pluginDependencies = [
  { name: 'TableColumnVisibility' },
  { name: 'Toolbar' },
];

class ColumnChooserBase extends React.PureComponent<ColumnChooserProps, ColumnChooserState> {
  static defaultProps = {
    messages: {},
  };
  static components = {
    overlayComponent: 'Overlay',
    containerComponent: 'Container',
    itemComponent: 'Item',
    toggleButtonComponent: 'ToggleButton',
  };
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
              <>
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
              </>
            )}
          </TemplateConnector>
        </Template>
      </Plugin>
    );
  }
}

/***
 * The ColumnChooser plugin allows a user to toggle grid columns' visibility at runtime.
 * The column chooser lists columns with checkboxes that control a corresponding
 * column's visibility.
 * */
export const ColumnChooser: React.ComponentType<ColumnChooserProps> = ColumnChooserBase;
