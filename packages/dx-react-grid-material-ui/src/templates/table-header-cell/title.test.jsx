import * as React from 'react';
import { createShallow, getClasses } from '@mui/material/test-utils';
import { Title } from './title';

const defaultProps = {
  classes: {},
  children: <span />,
};

describe('Title', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ untilSelector: 'TitleBase' });
    classes = getClasses(<Title {...defaultProps} />);
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
    ));

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
