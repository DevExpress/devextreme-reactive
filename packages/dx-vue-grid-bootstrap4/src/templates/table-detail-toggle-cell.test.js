import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableDetailToggleCell } from './table-detail-toggle-cell';
import { ExpandButton } from './parts/expand-button';

describe('TableDetailToggleCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should render ExpandButton', () => {
    const tree = shallow({
      render() {
        return (
          <TableDetailToggleCell />
        );
      },
    });

    expect(tree.find(ExpandButton).exists())
      .toBeTruthy();
  });
});
