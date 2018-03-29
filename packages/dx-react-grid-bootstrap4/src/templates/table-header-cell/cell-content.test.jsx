import * as React from 'react';
import { shallow } from 'enzyme';
import { CellContent } from './cell-content';

const defaultProps = {
  children: <span />,
};

describe('CellContent', () => {
  it('should have correct classes when grouping by click is not allowed and column align is left', () => {
    const tree = shallow((
      <CellContent
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
      <CellContent
        {...defaultProps}
        showGroupingControls
      />
    ));
    expect(tree.find('div').is('.text-nowrap.dx-rg-bs4-table-header-cell-wrapper.dx-rg-bs4-table-header-cell-left'))
      .toBeTruthy();
    expect(tree.find('div').is('.text-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is not allowed and column align is right', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
        align="right"
      />
    ));
    expect(tree.find('div').is('.text-nowrap.text-right'))
      .toBeTruthy();
    expect(tree.find('div').is('.dx-rg-bs4-table-header-cell-right'))
      .toBeFalsy();
  });

  it('should have correct classes when grouping by click is allowed and column align is right', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
        align="right"
        showGroupingControls
      />
    ));
    expect(tree.find('div').is('.text-nowrap.text-right.dx-rg-bs4-table-header-cell-right'))
      .toBeTruthy();
  });

  it('should have correct classes when column is aligned by center', () => {
    let tree = shallow((
      <CellContent
        {...defaultProps}
        align="center"
      />
    ));

    expect(tree.find('div').is('.text-nowrap.text-center'))
      .toBeTruthy();
    expect(tree.find('div').is('.dx-rg-bs4-table-header-cell-center'))
      .toBeFalsy();

    tree = shallow((
      <CellContent
        {...defaultProps}
        align="center"
        showGroupingControls
      />
    ));

    expect(tree.find('div').is('.text-nowrap.text-center.dx-rg-bs4-table-header-cell-center'))
      .toBeTruthy();
  });
  it('should apply custom class', () => {
    const tree = shallow((
      <CellContent
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
      <CellContent
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
