import * as React from 'react';
import { mount } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { Grid } from './grid';
import { GridCore } from './plugins/grid-core';

jest.mock('./plugins/grid-core', () => ({
  GridCore: () => null,
}));

const defaultProps = {
  rows: [],
  columns: [],
  getRowId: () => {},
  getCellValue: () => {},
  rootComponent: () => {},
};

describe('Grid', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render root template', () => {
    const TestChildren = () => null;

    const tree = mount((
      <Grid
        {...defaultProps}
      >
        <TestChildren />
        <TestChildren />
        <TestChildren />
      </Grid>
    ));

    expect(tree.find(GridCore).exists())
      .toBeTruthy();
    expect(tree.find(TestChildren))
      .toHaveLength(3);
  });
});
