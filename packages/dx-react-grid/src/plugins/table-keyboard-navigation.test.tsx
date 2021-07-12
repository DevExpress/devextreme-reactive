import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents, getComputedState } from '@devexpress/dx-testing';
import { PluginHost } from '@devexpress/dx-react-core';
import { TableKeyboardNavigation } from './table-keyboard-navigation';

jest.mock('@devexpress/dx-grid-core', () => ({
    getNextFocusedElement: jest.fn(),
    applyEnterAction: jest.fn(),
    applyEscapeAction: jest.fn(),
    TABLE_HEADING_TYPE: 'heading_type',
    TABLE_BAND_TYPE: 'band_type',
    TABLE_ADDED_TYPE: 'added_type'
}));

describe('TableKeyboardNavigation', () => {
    describe('Keyboard navigation in the body of table', () => {
        let focusFn;
        let querySelectorAllFn;
        let ref;
        beforeEach(() => {
            focusFn = jest.fn();
            querySelectorAllFn = jest.fn().mockReturnValue([]);
            ref = {current: { focus: focusFn, querySelectorAll: querySelectorAllFn }}
        });
        afterEach(() => {
            jest.resetAllMocks();
        });
        const defaultDeps = {
            getter: {
                tableColumns: [],
                tableBodyRows: [],
                rootRef: { 
                    current: {
                        removeEventListener: jest.fn(),
                        addEventListener: jest.fn()
                    }
                }
            }
        };
        const focusedCell = {
            rowKey: 'rowType',
            columnKey: 'columnType'
        };
        
        it('should focused cell', () => {
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={focusedCell}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType', 'columnType', 'add');

            expect(focusFn).toBeCalled();
        });

        it('should not focused cell if there are no cell with such parameters', () => {
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={focusedCell}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType_another', 'columnType_another', 'add');

            expect(focusFn).not.toBeCalled();
        });

        it('should focused cell using `defaultFocusedCell` option', () => {
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    defaultFocusedCell={focusedCell}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType', 'columnType', 'add');

            expect(focusFn).toBeCalled();
        });

        it('should not focused, focusedCell is undefined', () => {
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType', 'columnType', 'add');

            expect(focusFn).not.toBeCalled();
        });

        it('should call onFocusedCellChanged', () => {
            const onFocusedCellChanged = jest.fn();
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={focusedCell}
                    onFocusedCellChanged={onFocusedCellChanged}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType', 'columnType', 'add');

            expect(onFocusedCellChanged).toBeCalled();
            expect(onFocusedCellChanged).toBeCalledWith(focusedCell);
        });

        it('should not call onFocusedCellChanged on second time, on update, focused cell the same', () => {
            const onFocusedCellChanged = jest.fn();
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={focusedCell}
                    onFocusedCellChanged={onFocusedCellChanged}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType', 'columnType', 'add');
            tree.setProps({focusedCell: focusedCell});

            expect(onFocusedCellChanged).toBeCalledTimes(1);
            expect(onFocusedCellChanged).toBeCalledWith(focusedCell);
        });

        it('should not call onFocusedCellChanged, focused cell is not the body', () => {
            const cell = {
                rowKey: 'rowType',
                columnKey: 'columnType',
                part: 'toolbar'
            };
            const onFocusedCellChanged = jest.fn();
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={cell}
                    onFocusedCellChanged={onFocusedCellChanged}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.updateRefForKeyboardNavigation(ref, 'rowType', 'columnType', 'add');

            expect(onFocusedCellChanged).not.toBeCalled();
        });
    });
});
