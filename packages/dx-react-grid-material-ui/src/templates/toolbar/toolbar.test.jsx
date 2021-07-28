import * as React from 'react';
import { getClasses, createShallow } from '@material-ui/core/test-utils';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { Toolbar } from './toolbar';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('Toolbar', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(
      <Toolbar>
        <div />
      </Toolbar>,
    );
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
