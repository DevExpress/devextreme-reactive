import * as React from 'react';
import { mount } from 'enzyme';
import { withKeyboardNavigation } from './with-keyboard-navigation';

describe('#withKeyboardNavigation', () => {
    const defaultProps = { tableRow: { key: 'table-row' } as any, tableColumn: { key: 'table-column' } as any };
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component', () => {
        const BaseComponent = () => null;
        const TestComponent = withKeyboardNavigation()(BaseComponent);
        const tree = mount(<TestComponent {...defaultProps} />);
        
        expect(tree.find(BaseComponent).props()).toEqual({ 
            tableRow: defaultProps.tableRow,
            tableColumn: defaultProps.tableColumn,
            refObject: { current: null }
        });
    });

    it('should call setRefForKeyboardNavigation method', () => {
        const BaseComponent = () => null;
        const TestComponent = withKeyboardNavigation()(BaseComponent);
        const setRefForKeyboardNavigation = jest.fn();
        mount(<TestComponent {...defaultProps} setRefForKeyboardNavigation={setRefForKeyboardNavigation} />);

        expect(setRefForKeyboardNavigation).toBeCalledWith({ current: null }, defaultProps.tableRow.key, defaultProps.tableColumn.key);
    });

    it('should call setRefForKeyboardNavigation method with specific keys', () => {
        const BaseComponent = () => null;
        const TestComponent = withKeyboardNavigation('specific_key1', 'specific_key2')(BaseComponent);
        const setRefForKeyboardNavigation = jest.fn();
        const tree = mount(<TestComponent {...defaultProps} setRefForKeyboardNavigation={setRefForKeyboardNavigation} />);
        
        expect(setRefForKeyboardNavigation).toBeCalledWith({ current: null }, 'specific_key1', 'specific_key2');
    });
})