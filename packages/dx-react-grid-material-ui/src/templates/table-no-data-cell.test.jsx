import React from 'react';
import { Table } from 'material-ui';
import { createMount } from 'material-ui/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableNoDataCell } from './table-no-data-cell';

describe('TableNoDataCell', () => {
  let resetConsole;
  let mount;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    const mountMUI = createMount();
    mount = component => mountMUI(<Table>{component}</Table>);
  });
  afterAll(() => {
    resetConsole();
    mount.cleanUp();
  });

  it('should use "noData" text if defined', () => {
    const tree = mount((
      <TableNoDataCell getMessage={key => key} />
    ));

    expect(tree.find('big').text()).toBe('noData');
  });
});
