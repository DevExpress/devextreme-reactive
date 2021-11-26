import * as React from 'react';
import { mount } from 'enzyme';
import { TableHead } from './table-parts';

import { StyleContext } from './layout';

describe('TableHead', () => {
  it('should render header with correct styles', () => {
    const tree = mount((
      <StyleContext.Provider value={{ backgroundColor: 'backgroundColor', stickyPosition: 'stickyPosition' }}>
        <TableHead style={{}} />
      </StyleContext.Provider>
    ));

    expect(tree.find('thead').props()).toEqual({ style: {} });
  });

  it('should render header with correct styles, isFixed', () => {
    const tree = mount((
      <StyleContext.Provider value={{ backgroundColor: 'backgroundColor', stickyPosition: 'stickyPosition' }}>
        <TableHead style={{}} isFixed />
      </StyleContext.Provider>
    ));

    expect(tree.find('thead').props()).toEqual({
      style: {
        backgroundColor: 'backgroundColor',
        position: 'stickyPosition',
        top: 0,
        zIndex: 500,
      },
    });
  });
});
