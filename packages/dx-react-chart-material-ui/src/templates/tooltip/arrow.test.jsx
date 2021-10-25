import * as React from 'react';
import { createMount } from '@devexpress/dx-testing';
import { Arrow, classes } from './arrow';

describe('Arrow', () => {
  const defaultProps = {
    className: 'custom-className',
    placement: 'top',
  };
  let mount;
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
    expect(tree.find('div').is(`.${classes['arrow-top']}`)).toBeTruthy();
    expect(tree.find('div').is('.custom-className')).toBeTruthy();
  });

  it('should render Arrow, placement right', () => {
    const tree = mount((
      <Arrow
        {...defaultProps}
        placement="right"
      />
    ));
    expect(tree.find('div').is(`.${classes['arrow-right']}`)).toBeTruthy();
    expect(tree.find('div').is('.custom-className')).toBeTruthy();
  });
});
