import * as React from 'react';
import { shallow } from 'enzyme';

import { Content } from './content';

const defaultProps = {
  children: <span />,
};

describe('Content', () => {
  it('should have correct styles when grouping by click is not allowed and column align is left', () => {
    const tree = shallow((
      <Content
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
      <Content
        {...defaultProps}
        showGroupingControls
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
  it('should have correct styles when grouping by click is not allowed and column align is right', () => {
    const tree = shallow((
      <Content
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
      <Content
        {...defaultProps}
        align="right"
        showGroupingControls
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
  it('should apply custom styles', () => {
    const tree = shallow((
      <Content
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
