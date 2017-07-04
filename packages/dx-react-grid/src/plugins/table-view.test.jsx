import React from 'react';
import { mount } from 'enzyme';

import {
  Getter, Template, TemplatePlaceholder, PluginHost,
} from '@devexpress/dx-react-core';
import {
  getTableCellInfo,
} from '@devexpress/dx-grid-core';

import { TableView } from './table-view';

describe('TableView', () => {
  it('should render data cell on user-defined column and row intersection', () => {
    const tree = mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <Getter
          name="rows"
          value={[{ id: 1 }, { id: 2 }]}
        />
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          tableTemplate={({ bodyRows, columns, cellTemplate }) => (
            <table>
              <tbody>
                {bodyRows.map(row => (
                  <tr key={row.id}>
                    {columns.map(column => React.cloneElement(
                      cellTemplate({ row, column }),
                      { key: column.name },
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          tableCellTemplate={({ row, column }) => <td className="data">{row.id + column.name}</td>}
          tableStubCellTemplate={() => null}
          tableStubHeaderCellTemplate={() => null}
          tableNoDataCellTemplate={() => null}
        />
      </PluginHost>,
    );

    const dataCells = tree.find('td.data');
    expect(dataCells)
      .toHaveLength(4);
    expect(dataCells.map(dataCell => dataCell.text()))
      .toEqual(['1a', '1b', '2a', '2b']);
  });

  it('should render empty cell on plugin-defined column and row intersection', () => {
    const tree = mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <Getter
          name="rows"
          value={[{ id: 1 }, { id: 2 }]}
        />
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          tableTemplate={({ bodyRows, columns, cellTemplate }) => (
            <table>
              <tbody>
                {bodyRows.map(row => (
                  <tr key={row.id || row.type}>
                    {columns.map(column => React.cloneElement(
                      cellTemplate({ row, column }),
                      { key: column.name || column.type },
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          tableCellTemplate={() => <td className="data" />}
          tableStubCellTemplate={() => <td className="empty" />}
          tableStubHeaderCellTemplate={() => null}
          tableNoDataCellTemplate={() => null}
        />
        <Getter
          name="tableColumns"
          pureComputed={tableColumns => [{ type: 'columnPlugin' }, ...tableColumns]}
          connectArgs={getter => [getter('tableColumns')]}
        />
        <Getter
          name="tableBodyRows"
          pureComputed={tableBodyRows => [{ type: 'rowPlugin' }, ...tableBodyRows]}
          connectArgs={getter => [getter('tableBodyRows')]}
        />
      </PluginHost>,
    );

    expect(tree.find('td.empty'))
      .toHaveLength(5);
  });

  it('should render empty header cell on plugin-defined column and row intersection', () => {
    const tree = mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <Getter
          name="rows"
          value={[{ id: 1 }, { id: 2 }]}
        />
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          tableTemplate={({ headerRows, bodyRows, columns, cellTemplate }) => (
            <table>
              <tbody>
                {[...headerRows, ...bodyRows].map(row => (
                  <tr key={row.id || row.type}>
                    {columns.map(column => React.cloneElement(
                      cellTemplate({ row, column }),
                      { key: column.name || column.type },
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          tableCellTemplate={() => <td className="data" />}
          tableStubCellTemplate={() => <td className="empty" />}
          tableStubHeaderCellTemplate={() => <td className="empty-header" />}
          tableNoDataCellTemplate={() => null}
        />
        <Getter
          name="tableColumns"
          pureComputed={tableColumns => [{ type: 'columnPlugin' }, ...tableColumns]}
          connectArgs={getter => [getter('tableColumns')]}
        />
        <Getter
          name="tableHeaderRows"
          pureComputed={tableHeaderRows => [{ type: 'rowPlugin' }, ...tableHeaderRows]}
          connectArgs={getter => [getter('tableHeaderRows')]}
        />
      </PluginHost>,
    );

    expect(tree.find('td.empty-header'))
      .toHaveLength(3);
  });

  it('should render no data cell if rows are empty', () => {
    const tree = mount(
      <PluginHost>
        <Getter
          name="columns"
          value={[{ name: 'a' }, { name: 'b' }]}
        />
        <Getter
          name="rows"
          value={[]}
        />
        <Template name="root">
          <TemplatePlaceholder name="body" />
        </Template>
        <TableView
          tableTemplate={({ bodyRows, columns, cellTemplate }) => (
            <table>
              <tbody>
                {bodyRows.map(row => (
                  <tr key={row.id || row.type}>
                    {columns.map((column, columnIndex) => {
                      const info = getTableCellInfo({ row, column, columnIndex, columns });
                      if (info.skip) return null;

                      return React.cloneElement(
                        cellTemplate({ row, column, colspan: info.colspan }),
                        { key: column.name || column.type },
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          tableCellTemplate={() => null}
          tableStubCellTemplate={() => null}
          tableStubHeaderCellTemplate={() => null}
          tableNoDataCellTemplate={({ colspan }) => <td className="no-data" colSpan={colspan} />}
        />
      </PluginHost>,
    );

    const noDataCell = tree.find('td.no-data');
    expect(noDataCell)
      .toHaveLength(1);
    expect(noDataCell.prop('colSpan'))
      .toBe(2);
  });
});
