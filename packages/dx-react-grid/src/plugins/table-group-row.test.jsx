import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import {
  Getter, Template, TemplatePlaceholder, PluginHost,
} from '@devexpress/dx-react-core';
import {
  tableColumnsWithGrouping,
  tableRowsWithGrouping,
} from '@devexpress/dx-grid-core';

import { TableGroupRow } from './table-group-row';

jest.mock('@devexpress/dx-grid-core', () => ({
  tableColumnsWithGrouping: jest.fn(),
  tableRowsWithGrouping: jest.fn(),
}));

describe('TableGroupRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  describe('table layout getters extending', () => {
    it('should extend tableBodyRows', () => {
      tableRowsWithGrouping.mockImplementation(() => 'tableRowsWithGrouping');

      let tableBodyRows = null;
      mount(
        <PluginHost>
          <Getter name="tableBodyRows" value="tableBodyRows" />
          <TableGroupRow
            groupCellTemplate={() => null}
            groupIndentColumnWidth={40}
          />
          <Template
            name="root"
            connectGetters={getter => (tableBodyRows = getter('tableBodyRows'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableRowsWithGrouping)
        .toBeCalledWith('tableBodyRows');
      expect(tableBodyRows)
        .toBe('tableRowsWithGrouping');
    });

    it('should extend tableColumns', () => {
      tableColumnsWithGrouping.mockImplementation(() => 'tableColumnsWithGrouping');

      let tableColumns = null;
      mount(
        <PluginHost>
          <Getter name="tableColumns" value="tableColumns" />
          <Getter name="grouping" value="grouping" />
          <Getter name="draftGrouping" value="draftGrouping" />
          <TableGroupRow
            groupCellTemplate={() => null}
            groupIndentColumnWidth={40}
          />
          <Template
            name="root"
            connectGetters={getter => (tableColumns = getter('tableColumns'))}
          >
            {() => <div />}
          </Template>
        </PluginHost>,
      );

      expect(tableColumnsWithGrouping)
        .toBeCalledWith('tableColumns', 'grouping', 'draftGrouping', 40);
      expect(tableColumns)
        .toBe('tableColumnsWithGrouping');
    });
  });

  describe('groupIndentCellTemplate', () => {
    const testIndentCell = ({
      cellParams,
      shouldRender,
      template = () => <td className="group-indent" />,
    }) => {
      const tree = mount(
        <PluginHost>
          <Template name="root">
            <TemplatePlaceholder
              name="tableViewCell"
              params={cellParams}
            />
          </Template>
          <TableGroupRow
            groupCellTemplate={() => null}
            groupIndentColumnWidth={40}
            groupIndentCellTemplate={template}
          />
        </PluginHost>,
      );

      expect(tree.find('td.group-indent').exists())
        .toBe(shouldRender);
    };

    it('should render indent cell in a group column intersection with a foreign group row', () => {
      testIndentCell({
        cellParams: {
          column: { type: 'groupColumn', group: { columnName: 'a' } },
          row: { type: 'groupRow', column: { name: 'b' } },
        },
        shouldRender: true,
      });
    });

    it('should render indent cell in a group column intersection with a data row', () => {
      testIndentCell({
        cellParams: {
          column: { type: 'groupColumn', group: { columnName: 'a' } },
          row: { id: 1 },
        },
        shouldRender: true,
      });
    });

    it('should not render indent cell if it is undefined', () => {
      testIndentCell({
        cellParams: {
          column: { type: 'groupColumn', group: { columnName: 'a' } },
          row: { id: 1 },
        },
        template: null,
        shouldRender: false,
      });
    });
  });
});
