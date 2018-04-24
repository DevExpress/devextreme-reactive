import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableGroupCell } from './table-group-row-cell';

describe('TableGroupRowCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render column title and value', () => {
    const tree = shallow({
      render() {
        return (
          <TableGroupCell
            column={{ title: 'Title' }}
            row={{ value: 'Value' }}
          />
        );
      },
    });

    expect(tree.text())
      .toMatch(/Title.*Value/);
  });

  it('should pass default slot content', () => {
    const tree = shallow({
      render() {
        return (
          <TableGroupCell
            column={{ title: 'Title' }}
          >
            <div class="content" />
          </TableGroupCell>
        );
      },
    });

    expect(tree.find('.content').exists())
      .toBeTruthy();
  });
});
