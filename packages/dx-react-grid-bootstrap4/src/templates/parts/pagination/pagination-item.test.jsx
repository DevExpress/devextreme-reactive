import * as React from 'react';
import { shallow } from 'enzyme';
import { PaginationItem } from './pagination-item';

describe('Pagination item', () => {
  describe('className', () => {
    it('should be "page-item" by default', () => {
      const tree = shallow(<PaginationItem />);

      expect(tree.prop('className')).toBe('page-item');
    });

    it('should append "active" if this prop is set', () => {
      const tree = shallow(<PaginationItem active />);

      expect(tree.prop('className')).toContain('active');
    });

    it('should append "disabled" if this prop is set', () => {
      const tree = shallow(<PaginationItem disabled />);

      expect(tree.prop('className')).toContain('disabled');
    });
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <PaginationItem
        data={{ a: 1 }}
      />
    ));

    expect(tree.find('li').prop('data'))
      .toEqual({ a: 1 });
  });
});
