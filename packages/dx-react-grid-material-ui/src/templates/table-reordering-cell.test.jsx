import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableReorderingCell } from './table-reordering-cell';


describe('TableReorderingCell', () => {
  let resetConsole;
  let mount;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
    mount = createMount();
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should return dimensions', () => {
    const getCellDimensions = jest.fn();
    mount((
      <TableReorderingCell getCellDimensions={getCellDimensions} style={{ width: '100px' }} />
    ));
    const getDimensions = getCellDimensions.mock.calls[0][0];

    expect(getDimensions()).toEqual({
      left: 0,
      right: 0,
    });
  });

  it('should return dimensions based on "left" style value', () => {
    const getCellDimensions = jest.fn();
    mount((
      <TableReorderingCell getCellDimensions={getCellDimensions} style={{ left: 100 }} />
    ));
    const getDimensions = getCellDimensions.mock.calls[0][0];

    expect(getDimensions()).toEqual({
      isFixed: true,
      left: 100,
      right: 100,
    });
  });

  it('should return dimensions based on "right" style value', () => {
    const getCellDimensions = jest.fn();
    mount((
      <div>
        <div>
          <TableReorderingCell getCellDimensions={getCellDimensions} style={{ right: 100 }} />
        </div>
      </div>
    ));
    const getDimensions = getCellDimensions.mock.calls[0][0];

    expect(getDimensions()).toEqual({
      isFixed: true,
      left: -100,
      right: -100,
    });
  });
});
