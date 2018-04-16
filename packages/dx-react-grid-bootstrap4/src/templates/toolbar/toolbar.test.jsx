import * as React from 'react';
import { shallow } from 'enzyme';
import { Toolbar } from './toolbar';

describe('Toolbar', () => {
  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <Toolbar className="custom-class">
        <div />
      </Toolbar>
    ));

    expect(tree.is('.custom-class.card-header.dx-g-bs4-toolbar.d-flex.position-relative'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Toolbar data={{ a: 'a' }}>
        <div />
      </Toolbar>
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 'a' });
  });
});
