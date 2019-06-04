import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { TimeTableContainer } from './layout-container';

describe('TableTable common', () => {
  const defaultProps = {
    tableRef: React.createRef(),
    setCellElements: jest.fn(),
  };
  let mount;
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
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
      defaultProps.setCellElements.mockClear();

      tree.setProps({ a: 1 });

      expect(defaultProps.setCellElements)
        .toBeCalledTimes(1);
      expect(defaultProps.setCellElements)
        .toHaveBeenCalledWith(expect.arrayContaining([]));
      defaultProps.setCellElements.mockClear();
    });
  });
});
