import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Indicator, classes } from './indicator';

jest.mock('@mui/material/styles/styled', () => () => () => ({
  line: 'line',
  circle: 'circle',
  nowIndicator: 'nowIndicator',
}));

describe('CurrentTimeIndicator', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
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

      expect(tree.find(`.${classes.line}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.circle}`))
        .toHaveLength(1);
      expect(tree.find(`.${classes.nowIndicator}`))
        .toHaveLength(2);
    });
  });
});
