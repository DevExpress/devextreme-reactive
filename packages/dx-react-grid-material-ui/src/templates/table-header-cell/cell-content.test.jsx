import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { CellContent } from './cell-content';

const defaultProps = {
  classes: {},
  children: <span />,
};

describe('CellContent', () => {
  let shallow;
  let classes;
  beforeAll(() => {
    shallow = createShallow({ untilSelector: 'CellContentBase' });
    classes = getClasses(<CellContent {...defaultProps} />);
  });
  afterAll(() => {
    shallow.cleanUp();
  });

  it('should apply custom class', () => {
    const tree = shallow((
      <CellContent
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
