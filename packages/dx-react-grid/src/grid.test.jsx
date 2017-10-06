import React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Grid } from './grid';
import { GridCore } from './plugins/grid-core';

jest.mock('./plugins/grid-core', () => ({
  GridCore: () => null,
}));

describe('Grid', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render root template', () => {
    const props = {
      rows: [],
      columns: [],
      getRowId: () => {},
      getCellValue: () => {},
      rootTemplate: () => {},
      headerPlaceholderTemplate: () => {},
      footerPlaceholderTemplate: () => {},
    };

    const TestChildren = () => null;

    const tree = mount(
      <Grid
        {...props}
      >
        <TestChildren />
        <TestChildren />
        <TestChildren />
      </Grid>,
    );

    expect(tree.find(GridCore).exists())
      .toBeTruthy();
    expect(tree.find(TestChildren))
      .toHaveLength(3);
  });
});
