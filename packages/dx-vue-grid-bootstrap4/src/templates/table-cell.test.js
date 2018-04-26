import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';

import { TableCell } from './table-cell';

describe('TableCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole();
  });
  afterAll(() => {
    resetConsole();
  });

  it('should pass default slot content', () => {
    const wrapper = shallow({
      render() {
        return (
          <TableCell>
            <div class="content" />
          </TableCell>
        );
      },
    });

    expect(wrapper.find('.content').exists())
      .toBeTruthy();
  });

  it('should have correct text alignment', () => {
    let tree = shallow({
      render() {
        return (
          <TableCell />
        );
      },
    });
    expect(tree.find('td').is('.text-right'))
      .toBeFalsy();

    tree = shallow({
      render() {
        return (
          <TableCell tableColumn={{ align: 'left' }} />
        );
      },
    });
    expect(tree.find('td').is('.text-right'))
      .toBeFalsy();

    tree = shallow({
      render() {
        return (
          <TableCell tableColumn={{ align: 'right' }} />
        );
      },
    });
    expect(tree.find('td').is('.text-right.text-nowrap.dx-g-bs4-table-cell'))
      .toBeTruthy();

    tree = shallow({
      render() {
        return (
          <TableCell tableColumn={{ align: 'center' }} />
        );
      },
    });
    expect(tree.find('td').is('.text-center.text-nowrap.dx-g-bs4-table-cell'))
      .toBeTruthy();
  });

  it('should consider the `wordWrapEnabled` property', () => {
    let tree = shallow({
      render() {
        return (
          <TableCell />
        );
      },
    });
    expect(tree.find('td').is('.text-nowrap'))
      .toBeTruthy();

    tree = shallow({
      render() {
        return (
          <TableCell tableColumn={{ wordWrapEnabled: true }} />
        );
      },
    });
    expect(tree.find('td').is('.text-nowrap'))
      .toBeFalsy();
  });

  it('should have correct text', () => {
    const tree = shallow({
      render() {
        return (
          <TableCell value="text" />
        );
      },
    });
    expect(tree.find('td').text()).toBe('text');
  });
});
