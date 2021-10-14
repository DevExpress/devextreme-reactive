import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { SummaryCell } from './summary-cell';

describe('TableGroupRow', () => {
  describe('SummaryCell', () => {
    let shallow;
    beforeAll(() => {
      shallow = createShallow({ dive: true });
    });

    it('should expand grouped row on click', () => {
      const onToggle = jest.fn();
      const tree = shallow((
        <SummaryCell
          onToggle={onToggle}
        />
      ));
      tree.simulate('click');

      expect(onToggle)
        .toHaveBeenCalled();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <SummaryCell
          data={{ a: 1 }}
        />
      ));

      expect(tree.prop('data'))
        .toEqual({ a: 1 });
    });
  });
});
