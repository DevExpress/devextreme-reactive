import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { VERTICAL_GROUP_ORIENTATION } from '@devexpress/dx-scheduler-core';
import { Cell } from './cell';

jest.mock('@mui/styles/makeStyles', () => () => () => ({
  cell: 'cell',
  shadedCell: 'shadedCell',
  shadedPart: 'shadedPart',
  brightRightBorder: 'brightRightBorder',
  brightBorderBottom: 'brightBorderBottom',
}));

describe('Vertical view TimeTable', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  describe('Cell', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Cell className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is('.cell'))
        .toBeTruthy();
      expect(tree.is('.shadedCell'))
        .toBeFalsy();
      expect(tree.is('.brightRightBorder'))
        .toBeFalsy();
    });
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Cell data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
    it('should have tabIndex 0', () => {
      const tree = shallow((
        <Cell />
      ));

      expect(tree.props().tabIndex)
        .toBe(0);
    });
    it('should be shaded if isShaded is true', () => {
      const tree = shallow((
        <Cell isShaded />
      ));

      expect(tree.is('.shadedCell'))
        .toBeTruthy();
    });
    it('should contain a shaded part if isShaded is true', () => {
      const currentTime = new Date();
      const startDate = new Date(currentTime.getTime() - 100);
      const endDate = new Date(currentTime.getTime() + 100);
      const tree = shallow((
        <Cell
          isShaded
          currentTimeIndicatorPosition="50%"
          startDate={startDate}
          endDate={endDate}
        />
      ));

      expect(tree.find('.shadedPart').exists())
        .toBeTruthy();
      expect(tree.is('.shadedCell'))
        .toBeFalsy();
    });
    it('should contain currentTimeIndicator', () => {
      const currentTime = new Date();
      const startDate = new Date(currentTime.getTime() - 100);
      const endDate = new Date(currentTime.getTime() + 100);
      const currentTimeIndicatorComponent = jest.fn();
      const tree = shallow((
        <Cell
          currentTimeIndicatorPosition="50%"
          startDate={startDate}
          endDate={endDate}
          currentTimeIndicatorComponent={currentTimeIndicatorComponent}
        />
      ));

      expect(tree.find(currentTimeIndicatorComponent).exists())
        .toBeTruthy();
    });
    it('should render the last cell in a horizontal group', () => {
      const tree = shallow((
        <Cell endOfGroup />
      ));

      expect(tree.is('.brightRightBorder'))
        .toBeTruthy();
      expect(tree.is('.brightBorderBottom'))
        .toBeFalsy();
    });
    it('should render the last cell in a vertical group', () => {
      const tree = shallow((
        <Cell endOfGroup groupOrientation={VERTICAL_GROUP_ORIENTATION} />
      ));

      expect(tree.is('.brightBorderBottom'))
        .toBeTruthy();
      expect(tree.is('.brightRightBorder'))
        .toBeFalsy();
    });
  });
});
