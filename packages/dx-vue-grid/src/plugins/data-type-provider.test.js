import { mount } from '@vue/test-utils';
import { PluginHost, Template } from '@devexpress/dx-vue-core';
import { DataTypeProvider } from './data-type-provider';

describe('DataTypeProvider', () => {
  it('should define the "valueFormatter" with correct predicate if "formatterComponent" is specified', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <DataTypeProvider
              for={['test']}
              formatterComponent={{ render: () => null }}
            />
          </PluginHost>
        );
      },
    });

    const templates = tree.findAll(Template);
    const { name, predicate } = templates.at(0).props();

    expect(templates)
      .toHaveLength(1);
    expect(name)
      .toBe('valueFormatter');
    expect(predicate({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(predicate({ column: { name: 'value' } }))
      .toBeFalsy();
  });

  it('should define the "valueEditor" with correct predicate if "editorComponent" is specified', () => {
    const tree = mount({
      render() {
        return (
          <PluginHost>
            <DataTypeProvider
              for={['test']}
              editorComponent={{ render: () => null }}
            />
          </PluginHost>
        );
      },
    });

    const templates = tree.findAll(Template);
    const { name, predicate } = templates.at(0).props();

    expect(templates)
      .toHaveLength(1);
    expect(name)
      .toBe('valueEditor');
    expect(predicate({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(predicate({ column: { name: 'value' } }))
      .toBeFalsy();
  });
});
