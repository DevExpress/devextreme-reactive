import * as React from 'react';
import { shallow } from 'enzyme';
import {
  Pagination as PaginationBS4,
  PaginationItem,
  PaginationLink,
} from '../parts/pagination';
import { Pagination } from './pagination';

const defaultProps = {
  totalPages: 10,
  currentPage: 1,
  totalCount: 96,
  pageSize: 10,
  getMessage: key => key,
  onCurrentPageChange: () => {},
};

describe('Pagination', () => {
  it('can show info about rendered pages', () => {
    const getMessage = jest.fn(key => key);
    const tree = shallow((
      <Pagination
        {...defaultProps}
        getMessage={getMessage}
      />
    ));

    expect(getMessage)
      .toBeCalledWith('info', { from: 11, to: 20, count: 96 });
    expect(tree.find('span > span').text())
      .toBe('info');
  });

  it('can render pagination arrows', () => {
    const onCurrentPageChange = jest.fn();
    const paginations = shallow((
      <Pagination
        {...defaultProps}
        onCurrentPageChange={onCurrentPageChange}
      />
    )).find(PaginationBS4);

    const arrows = paginations.at(1).find(PaginationItem);
    const prev = arrows.at(0);
    const next = arrows.at(1);

    prev.find(PaginationLink).simulate('click', { preventDefault: jest.fn() });
    next.find(PaginationLink).simulate('click', { preventDefault: jest.fn() });

    expect(arrows).toHaveLength(2);
    expect(prev.props('previews')).toBeTruthy();
    expect(next.props('next')).toBeTruthy();
    expect(onCurrentPageChange.mock.calls).toHaveLength(2);
  });

  it('disables the prev arrow if the first page is active', () => {
    const paginations = shallow((
      <Pagination
        {...defaultProps}
        currentPage={0}
      />
    )).find(PaginationBS4);

    const arrows = paginations.at(1).find(PaginationItem);
    const prev = arrows.at(0);
    const next = arrows.at(1);

    expect(prev.props().disabled).toBeTruthy();
    expect(next.props().disabled).toBeFalsy();
  });

  it('disables the next arrow if current page equals to total page count', () => {
    const paginations = shallow((
      <Pagination
        {...defaultProps}
        currentPage={9}
        pageSize={5}
      />
    )).find(PaginationBS4);

    const arrows = paginations.at(1).find(PaginationItem);
    const prev = arrows.at(0);
    const next = arrows.at(1);

    expect(prev.props().disabled).toBeFalsy();
    expect(next.props().disabled).toBeTruthy();
  });
});
