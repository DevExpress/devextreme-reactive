import { shallow } from '@vue/test-utils';
import { setupConsole } from '@devexpress/dx-testing';
import { TableSelectAllCell } from './table-select-all-cell';

describe('TableSelectAllCell', () => {
  let resetConsole;
  beforeAll(() => {
    resetConsole = setupConsole({ ignore: ['validateDOMNesting'] });
  });
  afterAll(() => {
    resetConsole();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <TableSelectAllCell
            class="custom-class"
            onToggle={() => null}
          />
        );
      },
    });

    expect(tree.is('.custom-class'))
      .toBeTruthy();
    expect(tree.is('.align-bottom'))
      .toBeFalsy();
  });

  it('should pass rest props to the root element', () => {
    const tree = shallow({
      render() {
        return (
          <TableSelectAllCell
            data="123"
            onToggle={() => null}
          />
        );
      },
    });
    expect(tree.find('th').attributes().data).toBe('123');
  });

  it('should apply correct align if rowSpan is defined', () => {
    const rowSpan = 3;
    const tree = shallow({
      render() {
        return (
          <TableSelectAllCell
            rowSpan={rowSpan}
            onToggle={() => null}
          />
        );
      },
    });

    expect(tree.is('.text-center.align-bottom'))
      .toBeTruthy();
    expect(tree.is('.align-middle'))
      .toBeFalsy();
  });
});
