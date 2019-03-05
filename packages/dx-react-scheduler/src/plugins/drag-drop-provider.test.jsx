import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import {
  PluginHost, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
} from '@devexpress/dx-react-core';
import {
  cellIndex,
  cellData,
  cellType,
  allDayRects,
  verticalTimeTableRects,
  horizontalTimeTableRects,
  getAppointmentStyle,
} from '@devexpress/dx-scheduler-core';
import { DragDropProvider } from './drag-drop-provider';

jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...require.requireActual('@devexpress/dx-scheduler-core'),
  cellIndex: jest.fn(),
  cellData: jest.fn(),
  cellType: jest.fn(),
  allDayRects: jest.fn(),
  verticalTimeTableRects: jest.fn(),
  horizontalTimeTableRects: jest.fn(),
  getAppointmentStyle: jest.fn(),
}));

const defaultDeps = {
  getter: {
    currentDate: '2018-07-04',
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
    startViewDate: new Date('2018-06-25'),
    endViewDate: new Date('2018-08-05'),
    excludedDays: [],
    timeTableElement: {
      current: {
        querySelectorAll: () => [{}, {
          getBoundingClientRect: () => ({ height: 20, top: 20, bottom: 40 }),
        }],
      },
    },
    layoutElement: {
      current: {
        scrollTop: 10,
        offsetTop: 10,
        clientHeight: 100,
        getBoundingClientRect: () => ({ height: 1, top: 1 }),
      },
    },
    layoutHeaderElement: {
      current: {
        getBoundingClientRect: () => ({
          height: 10,
          top: 10,
        }),
        querySelectorAll: () => [],
      },
    },
  },
  action: {
    commitChangedAppointment: jest.fn(),
    changeAppointment: jest.fn(),
    startEditAppointment: jest.fn(),
    stopEditAppointment: jest.fn(),
  },
  template: {
    body: {},
    appointment: {
      data: 'appointment data',
    },
    allDayPanel: {},
    main: {},
  },
  plugins: ['EditingState', 'Appointments'],
};

const defaultProps = {
  draftAppointmentComponent: () => null,
  sourceAppointmentComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  containerComponent: ({ children }) => <div>{children}</div>,
};

describe('DragDropProvider', () => {
  beforeEach(() => {
    cellIndex.mockImplementation(() => 1);
    cellType.mockImplementation(() => 'vertical');
    cellData.mockImplementation(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-26 11:00') }));
    allDayRects.mockImplementation(() => []);
    verticalTimeTableRects.mockImplementation(() => []);
    horizontalTimeTableRects.mockImplementation(() => []);
    getAppointmentStyle.mockImplementation();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Templates', () => {
    it('should add drag drop provider', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(DragDropProviderCore).exists())
        .toBeTruthy();
    });
    it('should add drop target', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(DropTarget).exists())
        .toBeTruthy();
    });
    it('should wrap appointment into drag source', () => {
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      expect(tree.find(DragSource).exists())
        .toBeTruthy();
    });
    it('should do not wrap appointment into drag source by predicate', () => {
      const predicate = jest.fn();
      predicate.mockImplementation(() => false);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
            allowDrag={predicate}
          />
        </PluginHost>
      ));

      expect(tree.find(DragSource).exists())
        .toBeFalsy();
      expect(predicate)
        .toBeCalledWith('appointment data');
    });
  });

  describe('Dragging', () => {
    it('should render draft appointment template', () => {
      allDayRects.mockImplementationOnce(() => [{}]);
      const draftAppointment = () => <div className="custom-class" />;

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
            draftAppointmentComponent={draftAppointment}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload: 1, clientOffset: 1 });

      expect(tree.update().find('.custom-class').exists())
        .toBeTruthy();
    });

    it('should render source appointment template', () => {
      const deps = {
        template: {
          appointment: {
            data: {
              id: 1,
            },
          },
        },
      };
      allDayRects.mockImplementationOnce(() => [{}]);
      const sourceAppointment = () => <div className="custom-class" />;

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
            sourceAppointmentComponent={sourceAppointment}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      expect(tree.find('.custom-class').exists())
        .toBeTruthy();
    });

    it('should render only one container component', () => {
      allDayRects.mockImplementationOnce(() => [{}, {}]);
      verticalTimeTableRects.mockImplementationOnce(() => [{}, {}]);
      horizontalTimeTableRects.mockImplementationOnce(() => [{}, {}]);
      // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
      const container = ({ children }) => <div className="custom-class">{children}</div>;

      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
            containerComponent={container}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      expect(tree.find('.custom-class').length)
        .toBe(1);
    });
  });

  describe('Auto Scroll', () => {
    it('should scroll up', () => {
      const deps = {
        getter: {
          layoutElement: {
            current: {
              scrollTop: 10,
              offsetTop: 10,
              clientHeight: 100,
              getBoundingClientRect: () => ({ height: 1, top: 1 }),
            },
          },
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload: { id: 1 }, clientOffset: { x: 1, y: 21 } });
      tree.update();

      expect(deps.getter.layoutElement.current.scrollTop)
        .toBe(-20);
    });

    it('should scroll down', () => {
      const deps = {
        getter: {
          layoutElement: {
            current: {
              scrollTop: 10,
              offsetTop: 10,
              clientHeight: 200,
              getBoundingClientRect: () => ({ height: 1, top: 1 }),
            },
          },
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload: { id: 1 }, clientOffset: { x: 1, y: 161 } });
      tree.update();

      expect(deps.getter.layoutElement.current.scrollTop)
        .toBe(40);
    });

    it('should not scroll up under table header', () => {
      const deps = {
        getter: {
          layoutElement: {
            current: {
              scrollTop: 0,
            },
          },
          layoutHeaderElement: {
            current: {
              getBoundingClientRect: () => ({
                height: 20,
                top: 10,
              }),
              querySelectorAll: () => [],
            },
          },
        },
      };
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload: { id: 1 }, clientOffset: { x: 1, y: 25 } });
      tree.update();

      expect(deps.getter.layoutElement.current.scrollTop)
        .toBe(0);
    });
  });

  describe('calculate appointment boundaries', () => {
    it('for vertical appointment and vertical cell', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 25 } });

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));

      expect(defaultDeps.action.startEditAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.startEditAppointment)
        .toBeCalledWith({ appointmentId: 1 }, expect.any(Object), expect.any(Object));
    });

    it('for horizontal appointment and horizontal cell', () => {
      const payload = {
        id: 1,
        type: 'horizontal',
        startDate: new Date('2018-06-25'),
        endDate: new Date('2018-06-26'),
      };
      cellIndex.mockImplementationOnce(() => -1);
      cellIndex.mockImplementationOnce(() => 1);
      cellType.mockImplementationOnce(() => 'horizontal');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25'), endDate: new Date('2018-06-26') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 25 } });

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25'), endDate: new Date('2018-06-26') } }, expect.any(Object), expect.any(Object));
    });

    it('for vertical appointment and horizontal cell', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-10 10:00'),
        endDate: new Date('2018-06-10 11:00'),
      };
      cellIndex.mockImplementationOnce(() => -1);
      cellIndex.mockImplementationOnce(() => 1);
      cellType.mockImplementationOnce(() => 'horizontal');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25'), endDate: new Date('2018-06-26') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 25 } });

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25'), endDate: new Date('2018-06-26') } }, expect.any(Object), expect.any(Object));
    });

    it('for horizontal appointment and vertical cell', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-10'),
        endDate: new Date('2018-06-10'),
      };
      cellIndex.mockImplementationOnce(() => -1);
      cellIndex.mockImplementationOnce(() => 1);
      cellType.mockImplementationOnce(() => 'horizontal');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 25 } });

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
    });
  });

  describe('should dragging', () => {
    it('to other cell', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 20, bottom: 40 }));
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 0, bottom: 20 }));
      const deps = {
        getter: {
          timeTableElement: {
            current: {
              querySelectorAll: () => [{}, {
                getBoundingClientRect,
              }],
            },
          },
        },
      };
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 9:00'), endDate: new Date('2018-06-25 10:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 17 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 9:30'), endDate: new Date('2018-06-25 10:30') } }, expect.any(Object), expect.any(Object));
    });

    it('with save initial cursor position', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 9:30'), endDate: new Date('2018-06-25 10:30') } }, expect.any(Object), expect.any(Object));
    });
  });

  describe('drop', () => {
    it('should not change data over outside the cells', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellIndex.mockImplementationOnce(() => -1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
    });

    it('should not call actions if over inside an one cell', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 37 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
    });

    it('should commit changes if drop inside cell', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      const onDrop = tree.find(DropTarget).prop('onDrop');

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onDrop({ payload: undefined, clientOffset: undefined });
      tree.update();

      expect(defaultDeps.action.stopEditAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.commitChangedAppointment)
        .toBeCalledWith({ appointmentId: payload.id }, expect.any(Object), expect.any(Object));
    });

    it('should commit changes if drop outside cell', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      const onChange = tree.find(DragDropProviderCore).prop('onChange');

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onChange({ payload: undefined });

      expect(defaultDeps.action.stopEditAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.commitChangedAppointment)
        .toBeCalledWith({ appointmentId: payload.id }, expect.any(Object), expect.any(Object));
    });

    it('should reset cash if drop outside a cell', () => {
      const deps = {
        template: {
          appointment: {
            data: {
              id: 1,
            },
          },
        },
      };
      const draftAppointment = () => <div className="draft" />;
      const sourceAppointment = () => <div className="source" />;
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      allDayRects.mockImplementationOnce(() => [{}, {}]);
      verticalTimeTableRects.mockImplementationOnce(() => [{}, {}]);
      horizontalTimeTableRects.mockImplementationOnce(() => [{}, {}]);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
            draftAppointmentComponent={draftAppointment}
            sourceAppointmentComponent={sourceAppointment}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      const onChange = tree.find(DragDropProviderCore).prop('onChange');

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onChange({ payload: undefined });
      tree.update();

      expect(tree.find('.source').exists())
        .toBeFalsy();
      expect(tree.find('.draft').exists())
        .toBeFalsy();
    });

    it('should reset cash if drop inside a cell', () => {
      const deps = {
        template: {
          appointment: {
            data: {
              id: 1,
            },
          },
        },
      };
      const draftAppointment = () => <div className="draft" />;
      const sourceAppointment = () => <div className="source" />;
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'vertical');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') }));
      allDayRects.mockImplementationOnce(() => [{}, {}]);
      verticalTimeTableRects.mockImplementationOnce(() => [{}, {}]);
      horizontalTimeTableRects.mockImplementationOnce(() => [{}, {}]);
      const tree = mount((
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
            draftAppointmentComponent={draftAppointment}
            sourceAppointmentComponent={sourceAppointment}
          />
        </PluginHost>
      ));

      const onOver = tree.find(DropTarget).prop('onOver');
      const onDrop = tree.find(DropTarget).prop('onDrop');

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onDrop({ payload: undefined, clientOffset: undefined });
      tree.update();

      expect(tree.find('.source').exists())
        .toBeFalsy();
      expect(tree.find('.draft').exists())
        .toBeFalsy();
    });
  });
});
