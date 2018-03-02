import * as React from 'react';
import { shallow } from 'enzyme';
import { Pager } from './pager';
import { Pagination } from './pagination';

const defaultProps = {
  totalPages: 10,
  currentPage: 1,
  totalCount: 96,
  pageSize: 10,
  getMessage: key => key,
  pageSizes: [],
  onCurrentPageChange: () => {},
  onPageSizeChange: () => {},
};

describe('Pager', () => {
  it('renders pagination', () => {
    const pager = shallow((
      <Pager
        {...defaultProps}
      />
    ));
    const pagination = pager.find(Pagination);

    expect(pagination)
      .toHaveLength(1);
  });

  it('renders page size selector', () => {
    const pageSizeSelector = shallow((
      <Pager
        {...defaultProps}
        pageSizes={[5, 10]}
      />
    )).find('PageSizeSelector');

    expect(pageSizeSelector)
      .toHaveLength(1);
    expect(pageSizeSelector.at(0).prop('getMessage')('showAll'))
      .toBe('showAll');
  });

  it('doesn\'t render page selector if the pageSizes option is not defined ', () => {
    const pageSizeSelector = shallow((
      <Pager
        {...defaultProps}
      />
    )).find('PageSizeSelector');

    expect(pageSizeSelector).toHaveLength(0);
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow((
      <Pager
        {...defaultProps}
        data={{ a: 1 }}
      />
    ));

    expect(tree.prop('data'))
      .toEqual({ a: 1 });
  });

  it('should add the passed className to the root element', () => {
    const tree = shallow((
      <Pager
        {...defaultProps}
        className="custom-class"
      />
    ));

    expect(tree.is('.clearfix.card-footer.custom-class'))
      .toBeTruthy();
  });
});
