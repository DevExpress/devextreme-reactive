import * as React from 'react';
import { mount, shallow } from 'enzyme';
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
    const arrows = mount((
      <Pagination
        {...defaultProps}
        onCurrentPageChange={onCurrentPageChange}
      />
    )).find('.pager li');

    const prev = arrows.at(0);
    const next = arrows.at(1);

    prev.find('a').simulate('click');
    next.find('a').simulate('click');

    expect(arrows).toHaveLength(2);
    expect(prev.hasClass('disabled')).toBeFalsy();
    expect(next.hasClass('disabled')).toBeFalsy();
    expect(onCurrentPageChange.mock.calls).toHaveLength(2);
  });

  it('disables the prev arrow if the first page is active', () => {
    const onCurrentPageChange = jest.fn();
    const arrows = mount((
      <Pagination
        {...defaultProps}
        currentPage={0}
        onCurrentPageChange={onCurrentPageChange}
      />
    )).find('.pager li');

    const prev = arrows.at(0);
    const next = arrows.at(1);

    prev.find('a').simulate('click');
    next.find('a').simulate('click');

    expect(prev.hasClass('disabled')).toBeTruthy();
    expect(next.hasClass('disabled')).toBeFalsy();
    expect(onCurrentPageChange.mock.calls).toHaveLength(1);
  });

  it('disables the next arrow if current page equals to total page count', () => {
    const onCurrentPageChange = jest.fn();
    const arrows = mount((
      <Pagination
        {...defaultProps}
        currentPage={9}
        pageSize={5}
        onCurrentPageChange={onCurrentPageChange}
      />
    )).find('.pager li');

    const prev = arrows.at(0);
    const next = arrows.at(1);

    prev.find('a').simulate('click');
    next.find('a').simulate('click');

    expect(prev.hasClass('disabled')).toBeFalsy();
    expect(next.hasClass('disabled')).toBeTruthy();
    expect(onCurrentPageChange.mock.calls).toHaveLength(1);
  });

  it('should render aria-labels', () => {
    const arrows = mount((
      <Pagination
        {...defaultProps}
        currentPage={9}
        pageSize={5}
      />
    )).find('.pager li a');
    const prev = arrows.at(0);
    const next = arrows.at(1);

    expect(prev.prop('aria-label')).toBe('Previous');
    expect(next.prop('aria-label')).toBe('Next');
  });
});
