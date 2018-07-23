import * as React from 'react';
import { shallow } from 'enzyme';
import { Row } from './row';

describe('TimePanel', () => {
  describe('Row', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Row data={{ a: 1 }}>
          <div />
        </Row>
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });
  });
});
