import * as React from 'react';
import { getClasses, createShallow } from '@devexpress/dx-testing';
import { FlexibleSpace } from './flexible-space';

describe('FlexibleSpace', () => {
  let classes;
  let shallow;
  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<FlexibleSpace />);
  });
  it('should pass custom class to the root element', () => {
    const tree = shallow((
      <FlexibleSpace className="custom-class" />
    ));

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is(`.${classes.flexibleSpace}`))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <FlexibleSpace
        data={{ a: 'a' }}
      />
    ));

    expect(tree.prop('data'))
      .toMatchObject({ a: 'a' });
  });
});
