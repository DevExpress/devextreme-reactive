import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Content, classes } from './content';

const defaultProps = {
  classes: {},
  children: <span />,
};

describe('Content', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  afterAll(() => {
    shallow.cleanUp();
  });

  it('should apply custom class', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        className="customClass"
      />
    ));

    expect(tree.is(`.${classes.content}`))
      .toBeTruthy();
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

  it('should add correct class if align is right', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="right"
      />
    ));

    expect(tree.is(`.${classes.alignRight}`))
      .toBeTruthy();
  });

  it('should add correct class if align is center', () => {
    const tree = shallow((
      <Content
        {...defaultProps}
        align="center"
      />
    ));

    expect(tree.is(`.${classes.alignCenter}`))
      .toBeTruthy();
  });
});
