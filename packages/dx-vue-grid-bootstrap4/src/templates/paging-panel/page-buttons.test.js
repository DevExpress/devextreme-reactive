import { shallow } from '@vue/test-utils';
import { PageButtons } from './page-buttons';

const defaultProps = () => ({
  totalPageCount: 10,
  currentPage: 1,
  currentPageChange: () => jest.fn(),
});

describe('PageButtons', () => {
  it('can render only right points', () => {
    const tree = shallow({
      render() {
        return (
          <div>
            <PageButtons
              {...{ attrs: defaultProps() }}
            />
          </div>
        );
      },
    });
    const pageButtons = tree.findAll('li');

    const buttonWithPoints = pageButtons.at(pageButtons.length - 2);

    expect(pageButtons).toHaveLength(5);
    expect(buttonWithPoints.element.textContent).toBe('...');
  });

  it('can render only left points', () => {
    const tree = shallow({
      render() {
        return (
          <div>
            <PageButtons
              {...{ attrs: defaultProps() }}
              currentPage={10}
            />
          </div>
        );
      },
    });
    const pageButtons = tree.findAll('li');

    const buttonWithPoints = pageButtons.at(1);

    expect(pageButtons).toHaveLength(5);
    expect(buttonWithPoints.element.textContent).toBe('...');
  });

  it('can render left and right points', () => {
    const tree = shallow({
      render() {
        return (
          <div>
            <PageButtons
              {...{ attrs: defaultProps() }}
              currentPage={5}
            />
          </div>
        );
      },
    });
    const pageButtons = tree.findAll('li');

    const leftPoints = pageButtons.at(1);
    const rightPoints = pageButtons.at(pageButtons.length - 2);

    expect(pageButtons).toHaveLength(7);
    expect(leftPoints.element.textContent).toBe('...');
    expect(rightPoints.element.textContent).toBe('...');
  });
});
