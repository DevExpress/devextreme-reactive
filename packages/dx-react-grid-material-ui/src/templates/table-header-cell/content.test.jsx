import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
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

    expect(tree.find('div').is(`.${classes.cellContent}`))
      .toBeTruthy();
    expect(tree.find('div').is('.customClass'))
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
