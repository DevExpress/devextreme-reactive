import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import {
  Template, TemplatePlaceholder, PluginHost,
} from '@devexpress/dx-react-core';

import { TableGroupRow } from './table-group-row';

describe('TableGroupRow', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

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
