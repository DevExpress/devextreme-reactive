// import * as React from 'react';
// import { mount } from 'enzyme';
// import { setupConsole } from '@devexpress/dx-testing';
// import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-react-core/test-utils';
// import { PluginHost } from '@devexpress/dx-react-core';
// import {
// } from '@devexpress/dx-grid-core';
// import { TableFixedColumns } from './table-fixed-columns';

// jest.mock('@devexpress/dx-grid-core', () => ({
//   tableColumnsWithEditing: jest.fn(),
// }));

// const defaultDeps = {
//   template: {
//     tableCell: {
//       tableRow: { type: 'undefined', rowId: 1, row: 'row' },
//       tableColumn: { type: 'undefined', column: 'column' },
//       style: {},
//     },
//   },
//   plugins: ['Table'],
// };

// const defaultProps = {

// };

describe('TableFixedColumns', () => {
  let resetConsole;
  beforeAll(() => {
    // resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  beforeEach(() => {
    // tableColumnsWithEditing.mockImplementation(() => 'tableColumnsWithEditing');
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('', () => {
    // const tree = mount((
    //   <PluginHost>
    //     {pluginDepsToComponents(defaultDeps)}
    //     <TableFixedColumns />
    //   </PluginHost>
    // ));

    // expect()
    //   .toBeTruthy();
  });
});
