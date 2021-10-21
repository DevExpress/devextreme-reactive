import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Button } from './button';

describe('Common Dialog', () => {
  let shallow;
  const defaultProps = {
    onClick: jest.fn(),
  };
  beforeAll(() => {
    shallow = createShallow();
  });

  describe('Button', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Button {...defaultProps} data={{ testData: 'testData' }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ testData: 'testData' });
    });

    it('should handle click', () => {
      const tree = shallow((
        <Button {...defaultProps} />
      ));

      tree.simulate('click');
      expect(defaultProps.onClick)
        .toBeCalled();
    });

    it('should render title inside button', () => {
      const tree = shallow((
        <Button {...defaultProps} title="custom-text" />
      ));

      expect(tree.props().children)
        .toBe('custom-text');
    });
  });
});
