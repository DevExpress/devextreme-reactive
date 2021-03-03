import * as React from 'react';
import { createShallow, getClasses, createMount } from '@material-ui/core/test-utils';
import { ChangeMonthEditor } from './change-month-editor';

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    textEditorComponent: () => null,
    labelComponent: () => null,
    selectComponent: () => null,
    month: 1,
    months: [],
    dayNumber: 1,
    changeMonth: jest.fn(),
    changeByMonthDay: jest.fn(),
    getMessage: jest.fn(),
  };
  let classes;
  let shallow;
  let mount;
  beforeAll(() => {
    classes = getClasses(<ChangeMonthEditor {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  beforeEach(() => {
    mount = createMount();
  });
  afterEach(() => {
    mount.cleanUp();
  });
  describe('MonthlyEditor', () => {
    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <ChangeMonthEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass classname to the root element', () => {
      const tree = shallow((
        <ChangeMonthEditor className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.formControl}.custom-class`))
        .toBeTruthy();
    });

    it('should render its components correctly', () => {
      const tree = mount((
        <ChangeMonthEditor data={{ a: 1 }} {...defaultProps} />
      ));

      const labels = tree.find(defaultProps.labelComponent);
      expect(labels)
        .toHaveLength(1);
      expect(labels.at(0).is(`.${classes.label}`))
        .toBeTruthy();

      const textEditor = tree.find(defaultProps.textEditorComponent);
      expect(textEditor)
        .toHaveLength(1);
      expect(textEditor.at(0).is(`.${classes.textEditor}`))
        .toBeTruthy();
      expect(textEditor.at(0).prop('onValueChange'))
        .toEqual(defaultProps.changeByMonthDay);

      const selectComponents = tree.find(defaultProps.selectComponent);
      expect(selectComponents)
        .toHaveLength(1);
      expect(selectComponents.at(0).is(`.${classes.select}`))
        .toBeTruthy();
      expect(selectComponents.at(0).prop('onValueChange'))
        .toEqual(defaultProps.changeMonth);
    });

    it('should call getMessage with proper parameters', () => {
      shallow((<ChangeMonthEditor {...defaultProps} />));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('everyLabel');
    });

    it('should be read-only if readOnly is true', () => {
      const tree = shallow((<ChangeMonthEditor {...defaultProps} readOnly />));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });

    it('should pass "readOnlyEditors" property correctly', () => {
      const tree = mount(
        <ChangeMonthEditor
          {...defaultProps}
          readOnlyEditors
          readOnly={false}
        />,
      );

      const selectComponent = tree.find(defaultProps.selectComponent).at(0);
      expect(selectComponent.prop('readOnly'))
        .toBe(true);

      const textEditorComponent = tree.find(defaultProps.textEditorComponent).at(0);
      expect(textEditorComponent.prop('readOnly'))
        .toBe(true);
    });
  });
});
