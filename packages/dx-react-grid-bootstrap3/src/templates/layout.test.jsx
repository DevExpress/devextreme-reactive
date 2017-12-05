import React from 'react';
import { shallow } from 'enzyme';
import { Root, Header, Footer } from './layout';

describe('ColumnChooser', () => {
  it('should render without exceptions', () => {
    const tree = shallow((
      <Root
        value=""
        onValueChange={() => { }}
      />
    ));
    expect(tree.find('.panel').exists()).toBeTruthy();
    expect(tree.find('.panel').exists()).toBeTruthy();
  });
});
