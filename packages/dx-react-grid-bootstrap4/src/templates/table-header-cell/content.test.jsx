import * as React from 'react';
import { shallow } from 'enzyme';
import { Content } from './content';

const defaultProps = {
  children: <span />,
};

describe('Content', () => {
  it('should have correct classes when grouping by click is not allowed and column align is left', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
      />
    ));
    expect(tree.find('div').is('.text-nowrap.dx-rg-bs4-table-header-cell-wrapper'))
      .toBeTruthy();
    expect(tree.find('div').is('.text-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is allowed and column align is left', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        showGroupingControls
      />
    ));
    expect(tree.find('div').is('.text-nowrap.dx-rg-bs4-table-header-cell-wrapper'))
      .toBeTruthy();
    expect(tree.find('div').is('.text-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is not allowed and column align is right', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="right"
      />
    ));
    expect(tree.find('div').is('.text-nowrap.text-right'))
      .toBeTruthy();
  });

  it('should have correct classes when grouping by click is allowed and column align is right', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="right"
        showGroupingControls
      />
    ));
    expect(tree.find('div').is('.text-nowrap.text-right'))
      .toBeTruthy();
  });

  it('should have correct classes when column is aligned by center', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="center"
      />
    ));

    expect(tree.find('div').is('.text-nowrap.text-center'))
      .toBeTruthy();
  });
  it('should apply custom class', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        className="customClass"
      />
    ));
    expect(tree.find('div').is('.customClass'))
      .toBeTruthy();
    expect(tree.find('div').is('.dx-rg-bs4-table-header-cell-wrapper'))
      .toBeTruthy();
  });
  it('should spread rest props to the root element', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));
    expect(tree.find('div').prop('data'))
      .toMatchObject({
        a: 1,
      });
  });
});
