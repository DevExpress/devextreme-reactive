import * as React from 'react';
import { createShallow } from '@devexpress/dx-testing';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { Toolbar, classes } from './toolbar';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('Toolbar', () => {
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
  });
  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <Toolbar
        className="custom-class"
      >
        <div />
      </Toolbar>
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.toolbar}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Toolbar
        data={{ a: 'a' }}
      >
        <div />
      </Toolbar>
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 'a' });
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <Toolbar>
        <div />
      </Toolbar>
    ));

    expect(withKeyboardNavigation).toHaveBeenCalledWith('toolbar', 'none');
  });
});
