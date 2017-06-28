import React from 'react';
import { mount } from 'enzyme';

import { setupConsole } from '@devexpress/dx-testing';
import {
  Template, TemplatePlaceholder,
  PluginHost, Getter,
} from '@devexpress/dx-react-core';

import { TableFilterRow } from './table-filter-row';

describe('TableFilterRow', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });

  afterAll(() => {
    resetConsole();
  });

  it('should not pass the "row" property to the filterCellTemplate', () => {
    const filterCellTemplate = jest.fn().mockReturnValue(null);
    mount(
      <PluginHost>
        <Template name="root">
          <TemplatePlaceholder
            name="tableViewCell"
            params={{ column: { name: 'a' }, row: { type: 'filter' } }}
          />
        </Template>
        <Getter name="filters" value={[]} />
        <TableFilterRow
          filterCellTemplate={filterCellTemplate}
        />
      </PluginHost>,
    );

    expect(filterCellTemplate.mock.calls[0][0])
      .not.toHaveProperty('row');
  });
});
