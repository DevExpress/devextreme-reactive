import * as React from 'react';
import { shallow } from 'enzyme';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableSelectAllCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <TableSelectAllCell className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should apply correct align if rowSpan is defined', () => {
    const rowSpan = 3;
    const tree = shallow((
      <TableSelectAllCell rowSpan={rowSpan} />
    ));

    expect(tree.find('th').prop('style').verticalAlign).toBe('bottom');
  });
});
