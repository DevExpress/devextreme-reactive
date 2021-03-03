import * as React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import { Indicator } from './indicator';

jest.mock('@material-ui/core/styles', () => ({
  ...jest.requireActual('@material-ui/core/styles'),
  makeStyles: jest.fn(() => () => ({
    line: 'line',
    circle: 'circle',
    nowIndicator: 'nowIndicator',
  })),
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

      expect(tree.find('.line'))
        .toHaveLength(1);
      expect(tree.find('.circle'))
        .toHaveLength(1);
      expect(tree.find('.nowIndicator'))
        .toHaveLength(2);
    });
  });
});
