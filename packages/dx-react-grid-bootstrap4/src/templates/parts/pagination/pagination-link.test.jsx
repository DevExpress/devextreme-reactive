import * as React from 'react';
import { shallow } from 'enzyme';
import { PaginationLink } from './pagination-link';

describe('Pagination link', () => {
  it('should assign className to the root element', () => {
    const tree = shallow(<PaginationLink />);

    expect(tree.prop('className')).toBe('page-link');
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <PaginationLink
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should pass children to the root element', () => {
    const tree = shallow((
      <PaginationLink>
        <span className="custom" />
      </PaginationLink>
    ));

    expect(tree.find('.custom').exists())
      .toBeTruthy();
  });

  it('should not have aria-label by default', () => {
    const tree = shallow(<PaginationLink />);

    expect(tree.prop('aria-label'))
      .toBe('');
  });

  describe('"next" prop', () => {
    it('should set aria-label', () => {
      const tree = shallow(<PaginationLink next />);

      expect(tree.prop('aria-label'))
        .toBe('Next');
    });

    it('should render children if passed', () => {
      const tree = shallow((
        <PaginationLink next>
          <span className="custom" />
        </PaginationLink>
      ));

      expect(tree.find('a > span > .custom').exists())
        .toBeTruthy();
    });

    it('should render angle quote mark if no children passed', () => {
      const tree = shallow(<PaginationLink next />);

      expect(tree
        .findWhere(n => n.key() === 'caret')
        .text())
        .toBe('»');
    });

    it('should render aria label element for screen readers', () => {
      const tree = shallow(<PaginationLink next />);
      const srSpan = tree.find('.sr-only');

      expect(srSpan.key()).toBe('sr');
      expect(srSpan.childAt(0).text())
        .toBe('Next');
    });
  });

  describe('"previous" prop', () => {
    it('should set aria-label', () => {
      const tree = shallow(<PaginationLink previous />);

      expect(tree.prop('aria-label'))
        .toBe('Previous');
    });

    it('should render children if passed', () => {
      const tree = shallow((
        <PaginationLink previous>
          <span className="custom" />
        </PaginationLink>
      ));

      expect(tree.find('a > span > .custom').exists())
        .toBeTruthy();
    });

    it('should render angle quote mark if no children passed', () => {
      const tree = shallow(<PaginationLink previous />);

      expect(tree
        .findWhere(n => n.key() === 'caret')
        .text())
        .toBe('«');
    });

    it('should render aria label element for screen readers', () => {
      const tree = shallow(<PaginationLink previous />);
      const srSpan = tree.find('.sr-only');

      expect(srSpan.key()).toBe('sr');
      expect(srSpan.childAt(0).text())
        .toBe('Previous');
    });
  });
});
