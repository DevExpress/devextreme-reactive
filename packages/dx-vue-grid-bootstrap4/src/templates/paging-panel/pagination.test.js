import { shallow } from '@vue/test-utils';
import { Pagination } from './pagination';

const defaultProps = () => ({
  totalPages: 10,
  currentPage: 1,
  totalCount: 96,
  pageSize: 10,
  getMessage: key => key,
  onCurrentPageChange: () => { },
});

describe('Pagination', () => {
  it('can show info about rendered pages', () => {
    const getMessage = jest.fn(key => key);
    const tree = shallow({
      render() {
        return (
          <Pagination
            {...{ attrs: defaultProps() }}
            getMessage={getMessage}
          />
        );
      },
    });

    expect(getMessage)
      .toBeCalledWith('info', { from: 11, to: 20, count: 96 });
    expect(tree.find('span > span').text())
      .toBe('info');
  });

  it('can render pagination arrows', () => {
    const onCurrentPageChange = jest.fn();
    const tree = shallow({
      render() {
        return (
          <Pagination
            {...{ attrs: defaultProps() }}
            onCurrentPageChange={onCurrentPageChange}
          />
        );
      },
    });
    const paginations = tree.findAll('ul');

    const arrows = paginations.at(1).findAll('li');
    const prew = arrows.at(0);
    const next = arrows.at(1);

    prew.find('a').trigger('click');
    next.find('a').trigger('click');

    expect(arrows).toHaveLength(2);
    expect(prew.element.textContent).toBe('«');
    expect(next.element.textContent).toBe('»');
    expect(onCurrentPageChange.mock.calls).toHaveLength(2);
  });

  it('disables the prev arrow if the first page is active', () => {
    const tree = shallow({
      render() {
        return (
          <Pagination
            {...{ attrs: defaultProps() }}
            currentPage={0}
          />
        );
      },
    });
    const paginations = tree.findAll('ul');

    const arrows = paginations.at(1).findAll('li');
    const prew = arrows.at(0);
    const next = arrows.at(1);

    expect(prew.element.className).toBe('page-item disabled');
    expect(next.element.className).not.toBe('page-item disabled');
  });

  it('disables the next arrow if current page equals to total page count', () => {
    const tree = shallow({
      render() {
        return (
          <Pagination
            {...{ attrs: defaultProps() }}
            currentPage={9}
            pageSize={5}
          />
        );
      },
    });
    const paginations = tree.findAll('ul');

    const arrows = paginations.at(1).findAll('li');
    const prew = arrows.at(0);
    const next = arrows.at(1);

    expect(prew.element.className).not.toBe('page-item disabled');
    expect(next.element.className).toBe('page-item disabled');
  });
});
