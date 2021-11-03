import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { Title, classes } from './title';

const defaultProps = {
  classes: {},
  children: <span />,
};

describe('Title', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });
  afterAll(() => {
    shallow.cleanUp();
  });

  it('should apply custom class', () => {
    const tree = shallow((
      <Title
        {...defaultProps}
        className="customClass"
      />
    ))
      .shallow();

    expect(tree.is(`.${classes.title}`))
      .toBeTruthy();
    expect(tree.is('.customClass'))
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
