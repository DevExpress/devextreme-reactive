import * as React from 'react';
import { shallow } from 'enzyme';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid';
import { Toolbar } from './toolbar';

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

describe('Toolbar', () => {
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
    expect(tree.is('.panel-heading'))
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
      <Toolbar />
    ));

    expect(withKeyboardNavigation).toBeCalledWith('toolbar', 'none');
  });
});
