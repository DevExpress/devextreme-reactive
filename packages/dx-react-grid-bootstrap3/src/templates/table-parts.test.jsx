import * as React from 'react';
import { mount } from 'enzyme';
import { TableHead, TableFooter } from './table-parts';

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

describe('TableFooter', () => {
  it('should render footer with correct styles, isFixed', () => {
    const tree = mount((
      <StyleContext.Provider value={{ backgroundColor: 'backgroundColor', stickyPosition: 'stickyPosition' }}>
        <TableFooter isFixed />
      </StyleContext.Provider>
    ));

    expect(tree.find('tfoot').props()).toEqual({
      style: {
        backgroundColor: 'backgroundColor',
        position: 'stickyPosition',
        bottom: 0,
        zIndex: 500,
      },
    });
  });
});
