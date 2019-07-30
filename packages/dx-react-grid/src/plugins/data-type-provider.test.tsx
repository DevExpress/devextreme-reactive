import * as React from 'react';
import { mount } from 'enzyme';
import {
  getAvailableFilterOperationsGetter,
  TABLE_DATA_TYPE,
} from '@devexpress/dx-grid-core';
import {
  PluginHost,
  Template,
  TemplateConnector,
  TemplatePlaceholder,
} from '@devexpress/dx-react-core';
import { pluginDepsToComponents, getComputedState, setupConsole } from '@devexpress/dx-testing';
import { DataTypeProvider } from './data-type-provider';

jest.mock('@devexpress/dx-grid-core', () => ({
  getAvailableFilterOperationsGetter: jest.fn(),
}));

const defaultDeps = {
  getter: {
    tableColumns: [
      { key: `${TABLE_DATA_TYPE}_a`, type: TABLE_DATA_TYPE, column: { name: 'a' } },
      { key: `${TABLE_DATA_TYPE}_b`, type: TABLE_DATA_TYPE, column: { name: 'b' } },
    ],
  },
  template: {
    table: {},
  },
  plugins: ['Table'],
};

describe('DataTypeProvider', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });
  beforeEach(() => {
    getAvailableFilterOperationsGetter.mockImplementation(() => () => ['a', 'b']);
  });

  // tslint:disable-next-line: max-line-length
  it('should define the "valueFormatter" with correct predicate if "formatterComponent" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          formatterComponent={() => null}
        />
      </PluginHost>
    ));

    const valueFormatter = tree.findWhere(n => n.prop('name') === 'valueFormatter').last();

    expect(valueFormatter.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueEditor').exists())
      .toBeFalsy();
    expect(valueFormatter.prop('predicate')({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(valueFormatter.prop('predicate')({ column: { name: 'value' } }))
      .toBeFalsy();
  });

  // tslint:disable-next-line: max-line-length
  it('should define the "valueEditor" with correct predicate if "editorComponent" is specified', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          editorComponent={() => null}
        />
      </PluginHost>
    ));

    const valueEditor = tree.findWhere(n => n.prop('name') === 'valueEditor').last();

    expect(valueEditor.exists())
      .toBeTruthy();
    expect(tree.findWhere(n => n.prop('name') === 'valueFormatter').exists())
      .toBeFalsy();
    expect(valueEditor.prop('predicate')({ column: { name: 'test' } }))
      .toBeTruthy();
    expect(valueEditor.prop('predicate')({ column: { name: 'value' } }))
      .toBeFalsy();
  });

  it('should define the "getAvailableFilterOperations" getter', () => {
    const tree = mount((
      <PluginHost>
        <DataTypeProvider
          for={['test']}
          getAvailableFilterOperations={() => {}}
        />
        {pluginDepsToComponents({})}
      </PluginHost>
    ));
    expect(getComputedState(tree).getAvailableFilterOperations)
      .toEqual(expect.any(Function));
  });

  it('should re-register templates when "for" property changed in runtime', () => {
    class Test extends React.Component<{}, {columnNames: Array<string>}> {
      constructor(props) {
        super(props);
        this.state = {
          columnNames: [`${defaultDeps.getter.tableColumns[0].column.name}`],
        };
      }
      render() {
        const { columnNames } = this.state;
        return (
          <PluginHost>
            <Template name="table">
              <div>
                <TemplateConnector>
                  {({ tableColumns }) => (
                    <div>
                      {tableColumns.map(tableColumn => tableColumn.type === TABLE_DATA_TYPE && (
                        <TemplatePlaceholder
                          key={tableColumn.column.name}
                          name="tableCell"
                          params={{
                            tableColumn,
                            tableRow: { key: TABLE_DATA_TYPE, type: TABLE_DATA_TYPE },
                          }}
                        />
                      ))}
                    </div>
                  )}
                </TemplateConnector>
              </div>
            </Template>
            <Template name="tableCell">
              {props => (
                <TemplatePlaceholder
                  name="valueFormatter"
                  params={{
                    value: {},
                    column: props.tableColumn.column,
                  }}
                  key={props.tableColumn.column.name}
                />)
              }
            </Template>
            <DataTypeProvider
              for={columnNames}
              formatterComponent={() => null}
            />
            {pluginDepsToComponents(defaultDeps)}
          </PluginHost>
        );
      }
    }

    const tree = mount(<Test />);

    expect(tree
      .find('formatterComponent')
      .findWhere(node => node.prop('column') === defaultDeps.getter.tableColumns[0].column)
      .last().exists()).toBeTruthy();
    expect(tree
      .find('formatterComponent')
      .findWhere(node => node.prop('column') === defaultDeps.getter.tableColumns[1].column)
      .last().exists()).toBeFalsy();

    tree.setState({
      columnNames: [`${defaultDeps.getter.tableColumns[1].column.name}`],
    });

    expect(tree
      .find('formatterComponent')
      .findWhere(node => node.prop('column') === defaultDeps.getter.tableColumns[0].column)
      .last().exists()).toBeFalsy();
    expect(tree
      .find('formatterComponent')
      .findWhere(node => node.prop('column') === defaultDeps.getter.tableColumns[1].column)
      .last().exists()).toBeTruthy();
  });
});
