import * as React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import Paper from '@material-ui/core/Paper';
import { Sheet } from './sheet';

describe('Sheet', () => {
  const defaultProps = {
    className: 'custom-className',
  };
  let mount;
  const classes = getClasses(<Sheet {...defaultProps} />);

  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render Sheet', () => {
    const tree = mount((
      <Sheet
        {...defaultProps}
      />
    ));
    expect(tree.find(Paper).props()).toMatchObject({
      className: `${classes.root} custom-className`,
    });
  });
});
