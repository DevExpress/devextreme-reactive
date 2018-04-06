import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { ColumnGroup } from './column-group';

describe('ColumnGroup', () => {
  let resetConsole;
  beforeEach(() => {
    resetConsole = setupConsole();
  });

  afterEach(() => {
    resetConsole();
    jest.resetAllMocks();
  });

  it('should render the cols inside colgroup with correct properties', () => {
    const tree = shallow({
      render() {
        return (
          <ColumnGroup
            columns={[
              { key: 'a' },
              { key: 'b', width: 100 },
              { key: 'c', width: 200 },
            ]}
          />
        );
      },
    });

    expect(tree.findAll('col').wrappers.map(col => col.attributes().style))
      .toMatchObject([
        undefined,
        'width: 100px;',
        'width: 200px;',
      ]);
  });
});
