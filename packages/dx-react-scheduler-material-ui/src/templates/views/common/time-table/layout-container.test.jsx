import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { TimeTableContainer } from './layout-container';

describe('TableTable common', () => {
  const defaultProps = {
    tableRef: jest.fn(),
    setCellElements: jest.fn(),
  };
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    defaultProps.tableRef.mockClear();
    defaultProps.setCellElements.mockClear();
  });
  describe('TimeTableContainer', () => {
    it('should call setCellElements callback', () => {
      const tree = mount((
        <TimeTableContainer
          {...defaultProps}
        >
          <div />
        </TimeTableContainer>
      ));

      expect(defaultProps.setCellElements)
        .toBeCalledTimes(1);
      expect(defaultProps.setCellElements)
        .toHaveBeenCalledWith(expect.arrayContaining([]));

      tree.setProps({ a: 1 });

      expect(defaultProps.setCellElements)
        .toBeCalledTimes(2);
      expect(defaultProps.setCellElements)
        .toHaveBeenCalledWith(expect.arrayContaining([]));
    });

    it('should call tableRef function', () => {
      mount((
        <TimeTableContainer
          {...defaultProps}
        >
          <div />
        </TimeTableContainer>
      ));

      expect(defaultProps.tableRef)
        .toBeCalledTimes(1);
    });
  });
});
