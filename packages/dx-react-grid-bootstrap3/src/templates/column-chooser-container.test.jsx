import React from 'react';
import { shallow } from 'enzyme';
import { ColumnChooserContainer } from './column-chooser-container';

describe('ColumnChooserContainer', () => {
  it('should pass the className prop to the root element', () => {
    const tree = shallow((
      <ColumnChooserContainer
        className="custom-class"
      >
        <div />
        <div />
      </ColumnChooserContainer>
    ));

    expect(tree.is('.list-group'))
      .toBeTruthy();
    expect(tree.is('.custom-class'))
      .toBeTruthy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <ColumnChooserContainer
        data={{ a: 1 }}
      >
        <div />
        <div />
      </ColumnChooserContainer>
    ));

    expect(tree.props().data)
      .toMatchObject({ a: 1 });
  });
});
