import * as React from 'react';
import { shallow } from 'enzyme';
import { SummaryCell } from './summary-cell';

describe('TableGroupRow', () => {
  describe('SummaryCell', () => {
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
