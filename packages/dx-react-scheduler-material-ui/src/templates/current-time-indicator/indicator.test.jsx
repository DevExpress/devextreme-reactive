import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { getCurrentTimeIndicatorTop } from '@devexpress/dx-scheduler-core';
import { Indicator } from './indicator';

jest.mock('@material-ui/core/styles', () => ({
  ...require.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    line: 'line',
    circle: 'circle',
    nowIndicator: 'nowIndicator',
  })),
}));

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  getCurrentTimeIndicatorTop: jest.fn(),
}));

describe('CurrentTimeIndicator', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
    getCurrentTimeIndicatorTop.mockImplementation(() => 'getCurrentTimeIndicatorTop');
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Indicator', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Indicator data={{ testData: 'testData' }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ testData: 'testData' });
    });

    it('should render its elements', () => {
      const tree = shallow((
        <Indicator />
      ));

      expect(tree.find('.line'))
        .toHaveLength(1);
      expect(tree.find('.circle'))
        .toHaveLength(1);
      expect(tree.find('.nowIndicator'))
        .toHaveLength(2);
    });

    it('should call getCurrentTimeIndicatorTop with correct parameters', () => {
      const startDate = new Date(2019, 10, 10);
      const endDate = new Date(2019, 10, 12);
      const currentTime = new Date(2019, 10, 11);
      shallow((
        <Indicator
          startDate={startDate}
          endDate={endDate}
          currentTime={currentTime}
        />
      ));

      expect(getCurrentTimeIndicatorTop)
        .toHaveBeenCalledWith(startDate, endDate, currentTime);
    });
  });
});
