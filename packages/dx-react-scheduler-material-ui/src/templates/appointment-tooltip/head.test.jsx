import * as React from 'react';
import { createShallow, getClasses } from '@material-ui/core/test-utils';
import { Head } from './head';

describe('Appointment Tooltip', () => {
  let classes;
  let shallow;
  const defaultProps = {
    appointment: {},
    commandButtonIds: {
      open: 'open',
      close: 'close',
      delete: 'delete',
    },
    commandButtonComponent: () => null,
    showOpenButton: false,
    showCloseButton: false,
    showDeleteButton: false,
    getAppointmentTitle: () => 'title',
    onHide: jest.fn(),
  };
  beforeAll(() => {
    classes = getClasses(<Head {...defaultProps} />);
    shallow = createShallow({ dive: true });
  });
  describe('Head', () => {
    it('should pass className to the root element', () => {
      const tree = shallow((
        <Head {...defaultProps} className="custom-class" />
      ));

      expect(tree.is('.custom-class'))
        .toBeTruthy();
      expect(tree.is(`.${classes.head}`))
        .toBeTruthy();
    });

    it('should pass rest props to the root element', () => {
      const tree = shallow((
        <Head {...defaultProps} data={{ a: 1 }} />
      ));

      expect(tree.props().data)
        .toMatchObject({ a: 1 });
    });

    it('should render OpenButton', () => {
      const tree = shallow((
        <Head {...defaultProps} showOpenButton />
      ));

      expect(tree.find(defaultProps.commandButtonComponent).props().id)
        .toEqual('open');
    });

    it('should render CloseButton', () => {
      const tree = shallow((
        <Head {...defaultProps} showCloseButton />
      ));

      expect(tree.find(defaultProps.commandButtonComponent).props().id)
        .toEqual('close');
    });

    it('should render DeleteButton', () => {
      const tree = shallow((
        <Head {...defaultProps} showDeleteButton />
      ));

      expect(tree.find(defaultProps.commandButtonComponent).props().id)
        .toEqual('delete');
    });
  });
});
