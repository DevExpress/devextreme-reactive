import * as React from 'react';
import { shallow } from 'enzyme';

import { CellContent } from './cell-content';

const defaultProps = {
  children: <span />,
};

describe('CellContent', () => {
  it('should have correct styles when grouping by click is not allowed and column align is left', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
      />
    ));
    expect(tree.find('div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });
  it('should have correct styles when grouping by click is allowed and column align is left', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
        showGroupingControls
      />
    ));
    expect(tree.find('div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        marginRight: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });
  it('should have correct styles when grouping by click is not allowed and column align is right', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
        align="right"
      />
    ));
    expect(tree.find('div').prop('style'))
      .toMatchObject({
        textAlign: 'right',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });

  it('should have correct styles when grouping by click is allowed and column align is right', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
        align="right"
        showGroupingControls
      />
    ));
    expect(tree.find('div').prop('style'))
      .toMatchObject({
        textAlign: 'right',
        marginLeft: '14px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      });
  });
  it('should apply custom styles', () => {
    const tree = shallow((
      <CellContent
        {...defaultProps}
        style={{ color: 'red' }}
      />
    ));
    expect(tree.find('div').prop('style'))
      .toMatchObject({
        textAlign: 'left',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: 'red',
      });
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
