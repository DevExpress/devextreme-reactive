import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { Content } from './content';

const defaultProps = {
  classes: {},
  children: <span />,
};

describe('Content', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ untilSelector: 'ContentBase' });
    classes = getClasses(<Content {...defaultProps} />);
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
