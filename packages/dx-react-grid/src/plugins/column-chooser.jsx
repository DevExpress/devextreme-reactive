import React from 'react';
import PropTypes from 'prop-types';
import { Template, TemplateConnector } from '@devexpress/dx-grid-core';
import { PluginContainer, Getter } from '@devexpress/dx-react-core';

const pluginDependencies = [
  { pluginName: 'TableColumnVisibility' },
];
export class ColumnChooser extends React.PureComponent {
  render() {
    const {
      containerComponent: Container,
      itemComponent: Item,
    } = this.props;

    return (
      <PluginContainer
        pluginName="ColumnChooser"
        dependencies={pluginDependencies}
      >
        <Template name="toolbarContent" >
          {params => (
            <TemplateConnector>
              {({ items }, { toggleVisibility }) => (
                <Container
                  {...params}
                  items={items}
                  onItemToggle={toggleVisibility}
                >
                  {items.map(item => (
                    <Item
                      key={item.column.name}
                      item={item}
                      onToggle={() => toggleVisibility(item)}
                    />
                  ))}
                </Container>
              )}
            </TemplateConnector>
          )}
        </Template>

        <Getter name="tableColumns" computed={this.tableColumnsComputed} />
      </PluginContainer>
    );
  }
}

ColumnChooser.propTypes = {
  containerComponent: PropTypes.func.isRequired,
  itemComponent: PropTypes.func.isRequired,
};
