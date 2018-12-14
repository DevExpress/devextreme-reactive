import * as React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { Overlay } from './overlay';

describe('Overlay', () => {
  const defaultProps = {
    target: () => ({ }),
  };

  const mount = createMount();

  it('should render Popover', () => {
    const tree = mount((
      <Overlay
        {...defaultProps}
      >
        <div className="content" />
      </Overlay>
    ));

    expect(tree.find('Popper').props()).toMatchObject({
      open: true,
      anchorEl: defaultProps.target,
      placement: 'top',
    });
    expect(tree.find('Paper').exists()).toBeTruthy();
    expect(tree.find('.content').exists()).toBeTruthy();
  });
});
