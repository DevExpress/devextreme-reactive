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
    expect(tree.find('span').hasClass('dx-g-bs4-inactive'))
      .toBeTruthy();
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

    expect(tree.is('.dx-g-bs4-grouping-control'))
      .toBeTruthy();
    expect(tree.is('.customClass'))
      .toBeTruthy();
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
