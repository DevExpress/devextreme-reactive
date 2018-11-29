import * as React from 'react';
import { shallow } from 'enzyme';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('should pass className to the root element', () => {
    const tree = shallow(<Pagination className="custom" />);

    expect(tree.hasClass('custom'))
      .toBeTruthy();
  });

  it('should pass listClassName to the list element', () => {
    const tree = shallow(<Pagination listClassName="custom" />);

    expect(tree.find('ul').is('.pagination.custom'))
      .toBeTruthy();
  });

  it('should pass rest props to the list element', () => {
    const tree = shallow((
      <Pagination
        data={{ a: 1 }}
      />
    ));

    expect(tree.find('ul').prop('data'))
      .toEqual({ a: 1 });
  });
});
