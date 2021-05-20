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
    TABLE_BAND_TYPE: 'band_type'
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
                tableBodyRows: []
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
            getComputedState(tree).keyboardNavigationParams.setRefForKeyboardNavigation(ref, 'rowType', 'columnType');

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
            getComputedState(tree).keyboardNavigationParams.setRefForKeyboardNavigation(ref, 'rowType_another', 'columnType_another');

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
            getComputedState(tree).keyboardNavigationParams.setRefForKeyboardNavigation(ref, 'rowType', 'columnType');

            expect(focusFn).toBeCalled();
        });

        it('should not focused, focusedCell is undefined', () => {
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.setRefForKeyboardNavigation(ref, 'rowType', 'columnType');

            expect(focusFn).not.toBeCalled();
        });

    });

    describe('Keyboard navigation in the toolbar and footer', () => {
        let focusFn;
        let querySelectorAllFn;
        let ref;
        beforeEach(() => {
            focusFn = jest.fn();
            querySelectorAllFn = jest.fn().mockReturnValue([{ focus: focusFn }]);
            ref = {current: { querySelectorAll: querySelectorAllFn }};
        });
        afterEach(() => {
            jest.resetAllMocks();
        });
        const defaultDeps = {
            getter: {
                tableColumns: [],
                tableBodyRows: []
            }
        };

        it('should focused first element in the toolbar', () => {
            const focusedCell = {
                rowKey: 'toolbar',
                columnKey: 'none',
                part: 'toolbar',
                index: 0
            };
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={focusedCell}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.setRefForKeyboardNavigation(ref, 'toolbar', 'none');

            expect(focusFn).toBeCalled();
            expect(querySelectorAllFn).toBeCalledWith('[tabIndex], input');
        });

        it('should focused first element in the paging', () => {
            const focusedCell = {
                rowKey: 'paging',
                columnKey: 'none',
                part: 'paging',
                index: 0
            };
            const tree = mount((
                <PluginHost>
                    {pluginDepsToComponents(defaultDeps)}
                    <TableKeyboardNavigation
                    focusedCell={focusedCell}
                    />
                </PluginHost>
            ));
            getComputedState(tree).keyboardNavigationParams.setRefForKeyboardNavigation(ref, 'paging', 'none');

            expect(focusFn).toBeCalled();
            expect(querySelectorAllFn).toBeCalledWith('[tabIndex], input');
        });
    });
});
