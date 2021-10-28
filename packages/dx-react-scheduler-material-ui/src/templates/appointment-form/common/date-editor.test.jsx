import * as React from 'react';
import { shallow as enzymeShallow } from 'enzyme';
import { createShallow } from '@devexpress/dx-testing';
import DateTimePicker from '@mui/lab/DateTimePicker';
import * as coreUtils from '@devexpress/dx-scheduler-core';
import { DateEditor } from './date-editor';

const getMomentInstanceWithLocale = jest.spyOn(coreUtils, 'getMomentInstanceWithLocale');

describe('AppointmentForm common', () => {
  const defaultProps = {
    onValueChange: jest.fn(),
    locale: 'en-US',
  };
  let shallow;
  beforeAll(() => {
    shallow = createShallow();
  });

  describe('DateEditor', () => {
    it('should pass rest props to the DateTimePicker element', () => {
      const tree = shallow((
        <DateEditor {...defaultProps} data={{ a: 1 }} />
      ));

      const datePicker = tree.find(DateTimePicker);

      expect(datePicker)
        .toHaveLength(1);
      expect(datePicker.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should pass classNme to the DateTimePicker element', () => {
      const tree = enzymeShallow((
        <DateEditor {...defaultProps} className="custom-class" />
      ));
      const textField = enzymeShallow(tree.shallow().childAt(0).props().renderInput({}));
      expect(textField.at(0).is('.custom-class'))
        .toBeTruthy();
    });

    it('should handle onChange', () => {
      const tree = shallow((
        <DateEditor {...defaultProps} />
      ));

      const dateTimePicker = tree.find(DateTimePicker);

      dateTimePicker.at(0).simulate('change', coreUtils.convertToMoment(new Date()));
      expect(defaultProps.onValueChange)
        .toBeCalled();
    });

    it('should be disabled depending on readonly', () => {
      const tree = shallow((
        <DateEditor
          {...defaultProps}
          readOnly
        />
      ));

      expect(tree.find(DateTimePicker).at(0).prop('disabled'))
        .toBeTruthy();
    });

    it('should display time correctly', () => {
      const tree = shallow((
        <DateEditor
          {...defaultProps}
        />
      ));

      expect(tree.find(DateTimePicker).at(0).prop('inputFormat'))
        .toBe('DD/MM/YYYY hh:mm A');
    });

    it('should pass correct props to Localization Adapter', () => {
      const tree = shallow((
        <DateEditor
          {...defaultProps}
          locale="ru-RU"
        />
      ));

      expect(getMomentInstanceWithLocale)
        .toHaveBeenCalledWith('ru-RU');
      expect(tree.props())
        .toMatchObject({
          locale: 'ru-RU',
          dateLibInstance: expect.anything(),
        });
    });
  });
});
