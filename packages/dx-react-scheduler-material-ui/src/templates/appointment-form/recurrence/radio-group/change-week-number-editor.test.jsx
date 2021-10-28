import * as React from 'react';
import { createShallow, createMount } from '@devexpress/dx-testing';
import { ChangeWeekNumberEditor, classes } from './change-week-number-editor';

describe('AppointmentForm recurrence RadioGroup', () => {
  const defaultProps = {
    labelComponent: () => null,
    selectComponent: () => null,
    weekNumber: 1,
    weekNumbers: [],
    changeWeekNumber: jest.fn(),
    month: 1,
    months: [],
    changeMonth: jest.fn(),
    dayOfWeek: 1,
    daysOfWeek: [],
    changeDayOfWeek: jest.fn(),
    getMessage: jest.fn(),
  };
  let shallow;
  let mount;
  beforeAll(() => {
    shallow = createShallow();
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
        <ChangeWeekNumberEditor data={{ a: 1 }} {...defaultProps} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass classname to the root element', () => {
      const tree = shallow((
        <ChangeWeekNumberEditor className="custom-class" {...defaultProps} />
      ));

      expect(tree.is(`.${classes.formControl}.custom-class`))
        .toBeTruthy();
    });

    it('should render its components correctly', () => {
      const tree = mount((
        <ChangeWeekNumberEditor data={{ a: 1 }} {...defaultProps} />
      ));

      const label = tree.find(defaultProps.labelComponent);
      expect(label)
        .toHaveLength(1);
      expect(label.at(0).is(`.${classes.label}`))
        .toBeTruthy();

      const selectComponents = tree.find(defaultProps.selectComponent);
      expect(selectComponents)
        .toHaveLength(3);

      expect(selectComponents.at(0).is(`.${classes.select}`))
        .toBeTruthy();
      expect(selectComponents.at(0).prop('onValueChange'))
        .toEqual(defaultProps.changeWeekNumber);

      expect(selectComponents.at(1).is(`.${classes.longSelect}`))
        .toBeTruthy();
      expect(selectComponents.at(1).prop('onValueChange'))
        .toEqual(defaultProps.changeDayOfWeek);

      expect(selectComponents.at(2).is(`.${classes.doubleSelect}`))
        .toBeTruthy();
      expect(selectComponents.at(2).prop('onValueChange'))
        .toEqual(defaultProps.changeMonth);
    });

    it('should call getMessage with proper parameters', () => {
      shallow((<ChangeWeekNumberEditor {...defaultProps} />));

      expect(defaultProps.getMessage)
        .toHaveBeenCalledWith('theLabel');
    });

    it('should be read-only if readOnly is true', () => {
      const tree = shallow((<ChangeWeekNumberEditor {...defaultProps} readOnly />));

      expect(tree.prop('disabled'))
        .toBeTruthy();
    });

    it('should pass "readOnlyEditors" property correctly', () => {
      const tree = mount(
        <ChangeWeekNumberEditor
          {...defaultProps}
          readOnlyEditors
          readOnly={false}
        />,
      );

      const selectComponents = tree.find(defaultProps.selectComponent);

      expect(selectComponents.at(0).prop('readOnly'))
        .toBe(true);

      expect(selectComponents.at(1).prop('readOnly'))
        .toBe(true);

      expect(selectComponents.at(2).prop('readOnly'))
        .toBe(true);
    });
  });
});
