import * as React from 'react';
import { mount } from 'enzyme';
import { TableHead, TableFooter } from './table-parts';

import { BodyColorContext } from './layout';

describe('TableHead', () => {
  it('should render header with correct styles', () => {
    const tree = mount((
      <BodyColorContext.Provider value={'backgroundColor'}>
        <TableHead style={{}} />
      </BodyColorContext.Provider>
    ));

    expect(tree.find('thead').props()).toEqual({ className: '', style: {} });
  });

  it('should render header with correct styles, isFixed', () => {
    const tree = mount((
      <BodyColorContext.Provider value={'backgroundColor'}>
        <TableHead style={{}} isFixed />
      </BodyColorContext.Provider>
    ));

    expect(tree.find('thead').props()).toEqual({
      className: 'dx-g-bs4-fixed-header',
      style: { backgroundColor: 'backgroundColor' },
    });
  });
});

describe('TableFooter', () => {
  it('should render footer with correct styles, isFixed', () => {
    const tree = mount((
      <BodyColorContext.Provider value={'backgroundColor'}>
        <TableFooter isFixed />
      </BodyColorContext.Provider>
    ));

    expect(tree.find('tfoot').props()).toEqual({
      className: 'dx-g-bs4-fixed-footer',
      style: { backgroundColor: 'backgroundColor' },
    });
  });
});
