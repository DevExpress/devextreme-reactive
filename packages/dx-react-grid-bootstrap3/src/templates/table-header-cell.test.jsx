import React from 'react';
import { mount } from 'enzyme';
import { format } from 'util';
import { setupConsole } from '@devexpress/dx-core';
import { TableHeaderCell } from './table-header-cell';

describe('TableHeaderCell', () => {
  let resetConsole;

  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'], formatOutput: format });
  });

  afterAll(() => {
    resetConsole();
  });

  test('should use column name if title is not specified', () => {
    const tree = mount(
      <TableHeaderCell
        column={{
          name: 'Test',
        }}
      />,
    );

    expect(tree.find('th > div').text()).toBe('Test');
  });
});
