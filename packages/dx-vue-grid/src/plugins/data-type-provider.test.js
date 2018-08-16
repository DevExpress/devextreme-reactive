import { mount } from '@vue/test-utils';
import { DxPluginHost, DxTemplate } from '@devexpress/dx-vue-core';
import { DxDataTypeProvider } from './data-type-provider';

describe('DxDataTypeProvider', () => {
  it('should define the "valueFormatter" with correct predicate if "formatterComponent" is specified', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <DxDataTypeProvider
              for={['test']}
              formatterComponent={{ render: () => null }}
            />
          </DxPluginHost>
        );
      },
    });

    const templates = tree.findAll(DxTemplate);
    const { name, predicate } = templates.at(0).props();

    expect(templates)
      .toHaveLength(1);
    expect(name)
      .toBe('valueFormatter');
    expect(predicate({ attrs: { column: { name: 'test' } } }))
      .toBeTruthy();
    expect(predicate({ attrs: { column: { name: 'value' } } }))
      .toBeFalsy();
  });

  it('should define the "valueEditor" with correct predicate if "editorComponent" is specified', () => {
    const tree = mount({
      render() {
        return (
          <DxPluginHost>
            <DxDataTypeProvider
              for={['test']}
              editorComponent={{ render: () => null }}
            />
          </DxPluginHost>
        );
      },
    });

    const templates = tree.findAll(DxTemplate);
    const { name, predicate } = templates.at(0).props();

    expect(templates)
      .toHaveLength(1);
    expect(name)
      .toBe('valueEditor');
    expect(predicate({ attrs: { column: { name: 'test' } } }))
      .toBeTruthy();
    expect(predicate({ attrs: { column: { name: 'value' } } }))
      .toBeFalsy();
  });
});
