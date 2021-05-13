import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Pager } from './pager';
import { Pagination } from './pagination';
import { PageSizeSelector } from './page-size-selector';
import { withKeyboardNavigation } from '@devexpress/dx-react-grid'; 

jest.mock('@devexpress/dx-react-grid', () => ({
  withKeyboardNavigation: jest.fn().mockReturnValue(x => x),
}));

const defaultProps = {
  currentPage: 1,
  totalPages: 3,
  pageSize: 5,
  totalCount: 15,
  getMessage: key => key,
  pageSizes: [],
  onCurrentPageChange: () => {},
  onPageSizeChange: () => {},
};

describe('Pager', () => {
  let shallow;
  let classes;

  beforeAll(() => {
    shallow = createShallow({ dive: true });
    classes = getClasses(<Pager {...defaultProps} />);
  });

  describe('#render', () => {
    it('can render pagination', () => {
      const pager = shallow((
        <Pager
          {...defaultProps}
        />
      ));
      const pagination = pager.find(Pagination);

      expect(pagination)
        .toHaveLength(1);
    });

    it('can render page size selector', () => {
      const pager = shallow((
        <Pager
          {...defaultProps}
          pageSizes={[5, 10]}
        />
      ));
      const pageSizeSelector = pager.find(PageSizeSelector);

      expect(pageSizeSelector)
        .toHaveLength(1);
    });

    it('doesn\'t render page size selector if the pageSizes option is not defined', () => {
      const pager = shallow((
        <Pager
          {...defaultProps}
        />
      ));
      const pageSizeSelector = pager.find(PageSizeSelector);

      expect(pageSizeSelector)
        .toHaveLength(0);
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Pager
          {...defaultProps}
          onClick="onClick"
        />
      ));

      expect(tree.prop('onClick'))
        .toBe('onClick');
    });

    it('should add the passed className to the root element', () => {
      const tree = shallow((
        <Pager
          {...defaultProps}
          className="custom-class"
        />
      ));

      expect(tree.hasClass(classes.pager))
        .toBeTruthy();
      expect(tree.hasClass('custom-class'))
        .toBeTruthy();
    });
  });

  it('should call withKeyboardNavigation', () => {
    shallow((
      <Pager {...defaultProps} />
    ));

    expect(withKeyboardNavigation).toHaveBeenCalledWith('paging', 'none');
  });
});
