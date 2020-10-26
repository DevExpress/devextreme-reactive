// tslint:disable-next-line: import-name
import Immutable from 'seamless-immutable';
import { TABLE_DATA_TYPE } from '../table/constants';
import { FIXED_COLUMN_LEFT_SIDE, FIXED_COLUMN_RIGHT_SIDE, TABLE_FIXED_TYPE } from './constants';
import { getFixedColumnKeys, isFixedTableRow, calculateFixedColumnProps } from './helpers';
import { tableHeaderColumnChainsWithFixed } from './computeds';

describe('TableFixedColumns Plugin helpers', () => {
  const sampleType = Symbol('sample');
  const createColumn = (name, fixed) => ({
    key: `key_${name}`, type: TABLE_DATA_TYPE, column: { name }, ...fixed && { fixed },
  });
  const tableColumns = [
    createColumn('a', FIXED_COLUMN_LEFT_SIDE),
    createColumn('b', FIXED_COLUMN_LEFT_SIDE),
    {
      key: 'key_type1', type: sampleType,
    },
    createColumn('c', FIXED_COLUMN_RIGHT_SIDE),
    createColumn('d', FIXED_COLUMN_RIGHT_SIDE),
  ];
  const findColumnByNameCore = (name, columns) => (
    columns.find(c => c.column && c.column.name === name)
  );
  const tableColumnDimensions = {
    key_a: 20,
    key_b: 30,
    key_type1: 40,
    key_c: 70,
    key_d: 150,
  };
  const columnChains = tableHeaderColumnChainsWithFixed(
    [[{ start: 0, columns: tableColumns }]],
    {},
    tableColumns,
  );

  describe('#getFixedColumnKeys', () => {
    it('should return the correct array of column keys', () => {
      const fixedNames = ['a', 'd', sampleType];

      expect(getFixedColumnKeys(tableColumns, fixedNames))
        .toEqual(['key_a', 'key_type1', 'key_d']);
    });
  });

  describe('#isFixedTableRow', () => {
    it('should work', () => {
      expect(isFixedTableRow({ type: TABLE_FIXED_TYPE })).toBeTruthy();
      expect(isFixedTableRow({ type: 'undefined' })).toBeFalsy();
    });
  });

  describe('#calculateFixedColumnProps', () => {
    describe('position', () => {
      const calculatePosition = (fixedColumns, column) => {
        const { position } = calculateFixedColumnProps(
          { tableColumn: column },
          fixedColumns,
          tableColumns,
          tableColumnDimensions,
          columnChains,
        );
        return position;
      };
      const findColumnByName = name => findColumnByNameCore(name, tableColumns);

      it('should calculate position of columns fixed at the right side', () => {
        const fixedColumns = { leftColumns: ['a'], rightColumns: ['c', 'd'] };

        expect(calculatePosition(fixedColumns, findColumnByName('c'))).toBe(150);
        expect(calculatePosition(fixedColumns, findColumnByName('d'))).toBe(0);
      });

      it('should calculate position of columns fixed at the left side', () => {
        const fixedColumns = { leftColumns: ['a', 'b'], rightColumns: ['c'] };

        expect(calculatePosition(fixedColumns, findColumnByName('a'))).toBe(0);
        expect(calculatePosition(fixedColumns, findColumnByName('b'))).toBe(20);
      });
    });

    describe('dividers visibility', () => {
      const extendedTableColumns = [
        createColumn('a', FIXED_COLUMN_LEFT_SIDE),
        createColumn('col0'),
        createColumn('b0', FIXED_COLUMN_LEFT_SIDE),
        createColumn('b1', FIXED_COLUMN_LEFT_SIDE),
        createColumn('b2', FIXED_COLUMN_LEFT_SIDE),
        createColumn('col1'),
        createColumn('c', FIXED_COLUMN_LEFT_SIDE),
        createColumn('col2'),
        createColumn('d', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('col2'),
        createColumn('e0', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('e1', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('e2', FIXED_COLUMN_RIGHT_SIDE),
        createColumn('col3'),
        createColumn('f', FIXED_COLUMN_RIGHT_SIDE),
      ];
      const findColumnByName = name => findColumnByNameCore(name, extendedTableColumns);
      const extendedColumnChains = tableHeaderColumnChainsWithFixed(
        [[{ start: 0, columns: extendedTableColumns }]],
        {},
        extendedTableColumns,
      );

      const calculateDividers = column => (calculateFixedColumnProps(
        { tableColumn: column },
        { leftColumns: ['a', 'b0', 'b1', 'b2', 'c'], rightColumns: ['d', 'e0', 'e1', 'e2', 'f'] },
        extendedTableColumns,
        {},
        extendedColumnChains,
      ));

      it('should work with immutable properties', () => {
        expect(() => calculateFixedColumnProps(
          { tableColumn: findColumnByName('e1') },
          { leftColumns: ['a', 'b0', 'b1', 'b2', 'c'], rightColumns: ['d', 'e0', 'e1', 'e2', 'f'] },
          Immutable(extendedTableColumns),
          {},
          extendedColumnChains,
        )).not.toThrow();
      });
      it('should be visible for standalone left column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('c'));

        expect(showLeftDivider).toBeTruthy();
        expect(showRightDivider).toBeTruthy();
      });
      it('should be visible for standalone right column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('d'));

        expect(showLeftDivider).toBeTruthy();
        expect(showRightDivider).toBeTruthy();
      });

      it('should show only right divider for standalone leftmost column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('a'));

        expect(showLeftDivider).toBeFalsy();
        expect(showRightDivider).toBeTruthy();
      });
      it('should show only left divider for standalone rightmost column', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('f'));

        expect(showLeftDivider).toBeTruthy();
        expect(showRightDivider).toBeFalsy();
      });

      it('should show only left divider for first left column in a group', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('b0'));

        expect(showLeftDivider).toBeTruthy();
        expect(showRightDivider).toBeFalsy();
      });
      it('should show only right divider for first right column in a group', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('e2'));

        expect(showLeftDivider).toBeFalsy();
        expect(showRightDivider).toBeTruthy();
      });

      it('should not be visible for consecutive left columns', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('b1'));

        expect(showLeftDivider).toBeFalsy();
        expect(showRightDivider).toBeFalsy();
      });
      it('should not be visible for consecutive right columns', () => {
        const { showLeftDivider, showRightDivider } = calculateDividers(findColumnByName('e1'));

        expect(showLeftDivider).toBeFalsy();
        expect(showRightDivider).toBeFalsy();
      });
    });
  });
});
