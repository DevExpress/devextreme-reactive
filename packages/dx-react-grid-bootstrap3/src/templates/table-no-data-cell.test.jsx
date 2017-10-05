import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableNoDataCell } from './table-no-data-cell';

describe('TableNoDataCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should use "No data" string by default', () => {
    const tree = mount(
      <TableNoDataCell />,
    );

    expect(tree.find('big').text()).toBe('No data');
  });

  it('should use custom "No data" text if defined', () => {
    const tree = mount(
      <TableNoDataCell noDataText={'Nothing to show'} />,
    );

    expect(tree.find('big').text()).toBe('Nothing to show');
  });
});
