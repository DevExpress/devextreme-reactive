import * as React from 'react';
import { mount } from 'enzyme';
import { getAvailableFilterOperationsGetter } from '@devexpress/dx-grid-core';
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
      { key: 'a', column: { name: 'a' } },
      { key: 'b', column: { name: 'b' } },
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

  describe('change "for" property in runtime', () => {
    class Test extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          columnNames: this.props.columnNames,
          isRowEdit: this.props.isRowEdit,
        };
      }
      render() {
        const { columnNames } = this.state;
        const { formatterComponent, editorComponent } = this.props;
        return (
          <PluginHost>
            <Template name="table">
              <TemplateConnector>
                {({ tableColumns }) => (
                  <div>
                    {tableColumns.map((tableColumn) => {
                      const { isRowEdit } = this.state;
                      return isRowEdit
                      ? (
                        <TemplatePlaceholder
                          key={tableColumn.column.name}
                          name="editCell"
                          params={{
                            tableColumn,
                            tableRow: { key: 'edit_row' },
                          }}
                        />)
                      : (
                        <TemplatePlaceholder
                          key={tableColumn.column.name}
                          name="tableCell"
                          params={{
                            tableColumn,
                            tableRow: { key: 'row' },
                          }}
                        />);
                    })}
                  </div>
                )}
              </TemplateConnector>
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
            <Template name="editCell">
              {props => (
                <TemplatePlaceholder
                  name="valueEditor"
                  params={{
                    value: {},
                    column: props.tableColumn.column,
                  }}
                  key={props.tableColumn.column.name}
                />)
              }
            </Template>
            {pluginDepsToComponents(defaultDeps)}
            <DataTypeProvider
              for={columnNames}
              formatterComponent={formatterComponent}
              editorComponent={editorComponent}
            />
          </PluginHost>
        );
      }
    }

    it('should re-register valueFormatter templates', () => {
      const DataFormatter = () => null;
      const tree = mount((
        <Test
          columnNames={[defaultDeps.getter.tableColumns[0].column.name]}
          isRowEdit={false}
          formatterComponent={DataFormatter}
          editorComponent={null}
        />
      ));

      expect(tree
        .find('DataFormatter')
        .map(node => node.props()))
        .toMatchObject([{
          column: defaultDeps.getter.tableColumns[0].column,
          value: {},
        }]);

      tree.setState({
        columnNames: [defaultDeps.getter.tableColumns[1].column.name],
      });

      expect(tree
        .find('DataFormatter')
        .map(node => node.props()))
        .toMatchObject([{
          column: defaultDeps.getter.tableColumns[1].column,
          value: {},
        }]);
    });

    it('should re-register valueEditor templates', () => {
      const DataEditor = () => null;
      const tree = mount((
        <Test
          columnNames={[defaultDeps.getter.tableColumns[0].column.name]}
          isRowEdit={true}
          formatterComponent={null}
          editorComponent={DataEditor}
        />
      ));

      expect(tree
        .find('DataEditor')
        .map(node => node.props()))
        .toMatchObject([{
          column: defaultDeps.getter.tableColumns[0].column,
          value: {},
        }]);

      tree.setState({
        columnNames: [defaultDeps.getter.tableColumns[1].column.name],
      });

      expect(tree
        .find('DataEditor')
        .map(node => node.props()))
        .toMatchObject([{
          column: defaultDeps.getter.tableColumns[1].column,
          value: {},
        }]);
    });
  });
});
