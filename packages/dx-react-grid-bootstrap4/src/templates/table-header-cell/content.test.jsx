import * as React from 'react';
import { shallow } from 'enzyme';
import { Content } from './content';

const defaultProps = {
  children: <span />,
};

describe('Content', () => {
  it('should have correct classes when column is aligned by center', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="center"
      />
    ));

    expect(tree.is('.justify-content-center'))
      .toBeTruthy();
  });

  it('should have correct classes when column is aligned by center', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="right"
      />
    ));

    expect(tree.is('.justify-content-end'))
      .toBeTruthy();
  });

  it('should apply custom class', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        className="customClass"
      />
    ));
    expect(tree.is('.customClass'))
      .toBeTruthy();
  });

  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <Content
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
