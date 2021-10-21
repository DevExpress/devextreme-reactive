import * as React from 'react';
import { createMount, getClasses } from '@devexpress/dx-testing';
import { Arrow } from './arrow';

describe('Arrow', () => {
  const defaultProps = {
    className: 'custom-className',
    placement: 'top',
  };
  let mount;
  const classes = getClasses(<Arrow {...defaultProps} />);
  beforeEach(() => {
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render Arrow', () => {
    const tree = mount((
      <Arrow
        {...defaultProps}
      />
    ));
    expect(tree.find('div').props()).toMatchObject({
      className: `${classes['arrow-top']} custom-className`,
    });
  });

  it('should render Arrow, placement right', () => {
    const tree = mount((
      <Arrow
        {...defaultProps}
        placement="right"
      />
    ));
    expect(tree.find('div').props()).toMatchObject({
      className: `${classes['arrow-right']} custom-className`,
    });
  });
});
