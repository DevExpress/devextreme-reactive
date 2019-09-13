import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { ColumnGroup } from './column-group';

describe('ColumnGroup', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  it('should render the cols inside colgroup with correct properties', () => {
    const tree = shallow((
      <ColumnGroup
        columns={[
          { key: 'a' },
          { key: 'b', width: 100 },
          { key: 'c', width: 200 },
          { key: 'd', width: 200 },
        ]}
      />
    ));

    expect(tree.find('colgroup').children('col').map(col => col.prop('style')))
      .toMatchObject([
        undefined,
        { width: '100px' },
        { width: '200px' },
        { width: '200px' },
      ]);
  });

  it('should provide correct string properties', () => {
    const tree = shallow((
      <ColumnGroup
        columns={[
          { key: 'a', width: 'auto' },
          { key: 'b', width: '10%' },
          { key: 'c', width: '200px' },
          { key: 'd', width: '3em' },
        ]}
      />
    ));

    expect(tree.find('colgroup').children('col').map(col => col.prop('style')))
      .toMatchObject([
        { width: 'auto' },
        { width: '10%' },
        { width: '200px' },
        { width: '3em' },
      ]);
  });
});
