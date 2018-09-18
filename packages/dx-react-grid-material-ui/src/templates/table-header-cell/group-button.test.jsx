import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { GroupButton } from './group-button';

const defaultProps = {
  onGroup: jest.fn(),
};

describe('GroupButton', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<GroupButton {...defaultProps} />);
  });

  it('should have correct css class if disabled is true', () => {
    const tree = shallow((
      <GroupButton
        {...defaultProps}
        disabled
      />
    ));
    expect(tree.hasClass(classes.disabled))
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

    expect(tree.is(`.${classes.root}`))
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
