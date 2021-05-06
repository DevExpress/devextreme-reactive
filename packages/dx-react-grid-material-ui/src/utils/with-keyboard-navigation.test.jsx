import * as React from 'react';
import { mount } from 'enzyme';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { withKeyboardNavigation } from './with-keyboard-navigation';

describe('#withKeyboardNavigation', () => {
    const defaultProps = { tableRow: { key: 'table-row' }, tableColumn: { key: 'table-column' } };
    let shallow;
    beforeAll(() => {
        shallow = createShallow({ dive: true });
    });
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should render component', () => {
        const BaseComponent = () => null;
        const TestComponent = withKeyboardNavigation()(BaseComponent);
        const classes = getClasses(<TestComponent />);
        const tree = shallow(<TestComponent {...defaultProps} />);
        
        expect(tree.find(BaseComponent).props()).toEqual({ 
            tableRow: defaultProps.tableRow, 
            tableColumn: defaultProps.tableColumn,
            classes: classes,
            refComponent: { current: null }
        });
    });

    it('should call setRefForKeyboardNavigation method', () => {
        const BaseComponent = () => null;
        const TestComponent = withKeyboardNavigation()(BaseComponent);
        const setRefForKeyboardNavigation = jest.fn();
        shallow(<TestComponent {...defaultProps} setRefForKeyboardNavigation={setRefForKeyboardNavigation} />);

        expect(setRefForKeyboardNavigation).toBeCalledWith({ current: null }, defaultProps.tableRow.key, defaultProps.tableColumn.key);
    });

    it('should render component with specific keys', () => {
        const BaseComponent = () => null;
        const TestComponent = withKeyboardNavigation('specific_key1', 'specific_key2', true)(BaseComponent);
        const setRefForKeyboardNavigation = jest.fn();
        const tree = mount(<TestComponent {...defaultProps} setRefForKeyboardNavigation={setRefForKeyboardNavigation} />);
        
        expect(setRefForKeyboardNavigation).toBeCalledWith({ current: null }, 'specific_key1', 'specific_key2');

        expect(tree.find(BaseComponent).props()).toEqual({ 
            tableRow: defaultProps.tableRow,
            tableColumn: defaultProps.tableColumn,
            refComponent: { current: null }
        });
    });
})