import * as React from 'react';
import { shallow } from 'enzyme';
import { Title } from './title';

const defaultProps = {
  children: <span />,
};

describe('Title', () => {
  it('should apply custom class', () => {
    const tree = shallow((
      <Title
        {...defaultProps}
        className="customClass"
      />
    ));
    expect(tree.is('.customClass'))
      .toBeTruthy();
    expect(tree.is('.dx-rg-bs4-table-header-title'))
      .toBeTruthy();
  });

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <Title
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
