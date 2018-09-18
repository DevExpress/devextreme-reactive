import * as React from 'react';
import { shallow } from 'enzyme';
import { GroupButton } from './group-button';

const defaultProps = {
  onGroup: jest.fn(),
};

describe('GroupButton', () => {
  it('should have correct css class if disabled is true', () => {
    const tree = shallow((
      <GroupButton
        {...defaultProps}
        disabled
      />
    ));
    expect(tree.prop('style').opacity)
      .toBeDefined();
  });

  it('should not call the onGroup function if disabled is true', () => {
    const tree = shallow((
      <GroupButton
        {...defaultProps}
        disabled
      />
    ));
    tree.simulate('click', { stopPropagation: () => {} });

    expect(defaultProps.onGroup)
      .not.toBeCalled();
  });

  it('should apply custom class', () => {
    const tree = shallow((
      <GroupButton
        {...defaultProps}
        className="customClass"
      />
    ));

    expect(tree.is('.customClass'))
      .toBeTruthy();
  });

  it('should apply custom style', () => {
    const tree = shallow((
      <GroupButton
        {...defaultProps}
        style={{ opacity: 1 }}
      />
    ));

    expect(tree.prop('style').opacity)
      .toBe(1);
  });

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <GroupButton
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toMatchObject({
        a: 1,
      });
  });
});
