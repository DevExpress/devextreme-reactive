import * as React from 'react';
import { mount } from 'enzyme';
import { pluginDepsToComponents } from '@devexpress/dx-testing';
import {
  PluginHost, DropTarget, DragSource,
  DragDropProvider as DragDropProviderCore,
  TemplatePlaceholder, Template,
} from '@devexpress/dx-react-core';
import {
  cellIndex, cellData, cellType, getAppointmentStyle, autoScroll,
  calculateDraftAppointments, VERTICAL_GROUP_ORIENTATION, SCROLL_SPEED_PX,
} from '@devexpress/dx-scheduler-core';
import { DragDropProvider } from './drag-drop-provider';

// tslint:disable: max-line-length
jest.mock('@devexpress/dx-scheduler-core', () => ({
  ...jest.requireActual('@devexpress/dx-scheduler-core'),
  calculateDraftAppointments: jest.fn(),
  autoScroll: jest.fn(),
  cellIndex: jest.fn(),
  cellData: jest.fn(),
  cellType: jest.fn(),
  getAppointmentStyle: jest.fn(),
}));

const defaultDeps = {
  getter: {
    formatDate: jest.fn(),
    currentDate: '2018-07-04',
    viewCellsData: [
      [{ startDate: new Date('2018-06-25') }, {}],
      [{}, { startDate: new Date('2018-08-05') }],
    ],
    allDayCellsData: [[{ startDate: new Date('2018-06-25') }, {}]],
    startViewDate: new Date('2018-06-25'),
    endViewDate: new Date('2018-08-05'),
    excludedDays: [],
    timeTableElementsMeta: {
      parentRect: () => ({ height: 20, top: 20, bottom: 40 }),
      getCellRects: [{}, () => ({ height: 20, top: 20, bottom: 40 })],
    },
    allDayElementsMeta: {
      parentRect: () => ({ height: 20, top: 20, bottom: 40 }),
      getCellRects: [],
    },
    scrollingStrategy: {
      topBoundary: 10,
      bottomBoundary: 20,
      changeVerticalScroll: jest.fn(),
    },
    currentView: { name: 'currentView' },
    groupByDate: () => 'groupByDate',
  },
  action: {
    finishCommitAppointment: jest.fn(),
    changeAppointment: jest.fn(),
    startEditAppointment: jest.fn(),
    stopEditAppointment: jest.fn(),
  },
  template: {
    body: {},
    appointmentContent: {
      data: 'appointment data',
    },
    allDayPanel: {},
    timeTable: {},
  },
  plugins: ['EditingState', 'Appointments'],
};

const defaultProps = {
  resizeComponent: () => null,
  draftAppointmentComponent: () => null,
  sourceAppointmentComponent: () => null,
  // eslint-disable-next-line react/prop-types, react/jsx-one-expression-per-line
  containerComponent: ({ children }) => <div>{children}</div>,
};

describe('DragDropProvider', () => {
  beforeEach(() => {
    autoScroll.mockImplementation(() => undefined);
    cellIndex.mockImplementation(() => 1);
    cellType.mockImplementation(() => 'vertical');
    cellData.mockImplementation(() => ({ startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-26 11:00') }));
    calculateDraftAppointments.mockImplementation(() => ({
      allDayDraftAppointments: [{}],
      timeTableDraftAppointments: [{}],
    }));
    getAppointmentStyle.mockImplementation();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  const mountPlugin = (props, deps) => {
    const tree = mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps, deps)}
        <DragDropProvider
          {...defaultProps}
          {...props}
        />
      </PluginHost>
    ));

    const onOver = tree.find(DropTarget).prop('onOver');
    const onEnter = tree.find(DropTarget).prop('onEnter');
    const onDrop = tree.find(DropTarget).prop('onDrop');
    const onLeave = tree.find(DropTarget).prop('onLeave');
    const onChange = tree.find(DragDropProviderCore).prop('onChange');

    return ({
      tree, onOver, onEnter, onDrop, onChange, onLeave,
    });
  };

  describe('Templates: ', () => {
    const renderPlugin = props => mount((
      <PluginHost>
        {pluginDepsToComponents(defaultDeps)}
        <DragDropProvider
          {...defaultProps}
          {...props}
        />
      </PluginHost>
    ));
    it('should add drag drop provider plugin', () => {
      const tree = renderPlugin();

      expect(tree.find(DragDropProviderCore).exists())
        .toBeTruthy();
    });
    it('should add drop target plugin', () => {
      const tree = renderPlugin();

      expect(tree.find(DropTarget).exists())
        .toBeTruthy();
    });
    it('should wrap appointment into drag source plugin', () => {
      const tree = renderPlugin();

      expect(tree.find(DragSource).exists())
        .toBeTruthy();
    });
    it('should pass draggable property to appointment template', () => {
      const tree = renderPlugin();

      expect(tree.find(TemplatePlaceholder).findWhere(element => element.prop('params') && element.prop('params').draggable === true).exists())
        .toBeTruthy();
    });
    it('should not wrap appointment into drag source by allowDrag', () => {
      const allowDrag = jest.fn();
      allowDrag.mockImplementation(() => false);
      const tree = renderPlugin({ allowDrag });

      expect(tree.find(DragSource).exists())
        .toBeFalsy();
      expect(allowDrag)
        .toBeCalledWith('appointment data');
    });
    it('should render draft appointment component', () => {
      const draftAppointment = props => <div {...props} className="custom-class" />;

      const { tree, onOver } = mountPlugin({ draftAppointmentComponent: draftAppointment });

      onOver({ payload: 1, clientOffset: 1 });

      const draftAppt = tree.update().find('.custom-class');
      expect(draftAppt.exists())
        .toBeTruthy();
      expect(draftAppt.at(1).prop('formatDate'))
        .toBe(defaultDeps.getter.formatDate);
    });
    it('should render source appointment component', () => {
      const deps = {
        template: {
          appointmentContent: {
            data: {
              id: 1,
            },
            formatDate: jest.fn(),
          },
        },
      };
      const sourceAppointment = props => <div {...props} className="custom-class" />;

      const { tree, onOver } = mountPlugin({ sourceAppointmentComponent: sourceAppointment }, deps);

      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      const sourceAppt = tree.update().find('.custom-class');
      expect(sourceAppt.exists())
        .toBeTruthy();
      expect(sourceAppt.at(0).prop('formatDate'))
        .toBe(deps.template.appointmentContent.formatDate);
    });
    it('should render resize component', () => {
      const deps = {
        template: {
          appointmentTop: {
            type: 'appt-top',
            slice: false,
          },
          appointmentBottom: {
            type: 'appt-bottom',
            slice: false,
          },
        },
      };
      const resizeAppointment = () => <div className="custom-class" />;

      const { tree, onOver } = mountPlugin({ resizeComponent: resizeAppointment }, deps);

      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      const resizeComponents = tree.find(resizeAppointment);
      expect(resizeComponents.at(0).props())
        .toEqual({
          appointmentType: 'appt-bottom',
          position: 'end',
        });
      expect(resizeComponents.at(1).props())
        .toEqual({
          appointmentType: 'appt-top',
          position: 'start',
        });
    });
    it('should wrap resize components into DragSource', () => {
      const deps = {
        template: {
          appointmentTop: {
            type: 'appt-top',
            slice: false,
            data: { a: 1 },
          },
          appointmentBottom: {
            type: 'appt-bottom',
            slice: false,
            data: { a: 1 },
          },
        },
      };
      const resizeAppointment = () => <div className="custom-class" />;

      const { tree, onOver } = mountPlugin({ resizeComponent: resizeAppointment }, deps);

      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      const resizeComponents = tree.find(DragSource);
      expect(resizeComponents.at(0).prop('payload'))
        .toEqual({
          appointmentType: 'appt-bottom',
          type: 'resize-end',
          a: 1,
        });
      expect(resizeComponents.at(1).prop('payload'))
        .toEqual({
          appointmentType: 'appt-top',
          type: 'resize-start',
          a: 1,
        });
    });
    it('should not render resize template of allowResize => false', () => {
      const allowResize = jest.fn();
      allowResize.mockImplementation(() => false);
      const deps = {
        template: {
          appointmentTop: {
            data: {},
          },
        },
      };
      const resizeAppointment = () => <div className="custom-class" />;

      const { tree, onOver } = mountPlugin({ allowResize, resizeComponent: resizeAppointment }, deps);

      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      expect(tree.find(resizeAppointment).exists())
        .toBeFalsy();
      expect(allowResize)
        .toBeCalledWith(deps.template.appointmentTop.data);
    });
    it('should change Resize render in runtime depending on allowResize prop', () => {
      const allowResizing = () => true;
      const deps = {
        template: {
          appointmentTop: {
            data: {
              appointmentType: 'appt-top',
              slice: false,
              data: { a: 1 },
            },
          },
          appointmentBottom: {
            data: {
              appointmentType: 'appt-bottom',
              slice: false,
              data: { a: 1 },
            },
          },
        },
      };
      const Test = ({ allowResize }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps, deps)}
          <DragDropProvider
            {...defaultProps}
            allowResize={allowResize}
          />
        </PluginHost>
      );

      const tree = mount(<Test allowResize={allowResizing} />);

      expect(tree.find(defaultProps.resizeComponent))
        .toHaveLength(2);

      const nextAllowResize = () => false;
      tree.setProps({ allowResize: nextAllowResize });

      expect(tree.find(defaultProps.resizeComponent))
        .toHaveLength(0);
    });
    it('should change DragSource render in runtime depending on allowDrag prop', () => {
      const allowDragging = () => true;
      const Test = ({ allowDrag }) => (
        <PluginHost>
          {pluginDepsToComponents(defaultDeps)}
          <DragDropProvider
            {...defaultProps}
            allowDrag={allowDrag}
          />
        </PluginHost>
      );

      const tree = mount(<Test allowDrag={allowDragging} />);

      expect(tree.find(DragSource).exists())
        .toBeTruthy();

      const nextAllowDragging = () => false;
      tree.setProps({ allowDrag: nextAllowDragging });

      expect(tree.find(DragSource).exists())
        .toBeFalsy();
    });
    it('should render draftAppointment template', () => {
      const deps = {
        template: {
          appointmentTop: {
            data: {},
          },
        },
      };

      const { tree } = mountPlugin({}, deps);
      const templatePlaceholder = tree
        .find(Template)
        .filterWhere(node => node.props().name === 'draftAppointment');

      expect(templatePlaceholder.exists())
        .toBeTruthy();
    });
    it('should render all-day appointments inside allDayPanel template', () => {
      const { tree, onOver } = mountPlugin({}, {});

      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      const timeTableTemplate = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'timeTable').first()
        .children().find('TemplatePlaceholderBase');
      const allDayPanelTemplate = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'allDayPanel').first()
        .children().find('TemplatePlaceholderBase');

      const timeTableTemplateDraftAppointments = timeTableTemplate
        .find(defaultProps.draftAppointmentComponent);
      const allDayPanelTemplateAppointments = allDayPanelTemplate
        .find(defaultProps.draftAppointmentComponent);

      expect(timeTableTemplateDraftAppointments)
        .toHaveLength(1);
      expect(allDayPanelTemplateAppointments)
        .toHaveLength(1);
    });
    it('should render all-day appointments inside timeTable template when vertical grouping is used', () => {
      const deps = {
        getter: {
          groupOrientation: () => VERTICAL_GROUP_ORIENTATION,
        },
      };
      const { tree, onOver } = mountPlugin({}, deps);

      onOver({ payload: { id: 1 }, clientOffset: 1 });
      tree.update();

      const timeTableTemplate = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'timeTable').first()
        .children().find('TemplatePlaceholderBase');
      const allDayPanelTemplate = tree
        .find('TemplatePlaceholderBase')
        .filterWhere(node => node.props().name === 'allDayPanel').first()
        .children().find('TemplatePlaceholderBase');

      const timeTableTemplateDraftAppointments = timeTableTemplate
        .find(defaultProps.draftAppointmentComponent);
      const allDayPanelTemplateAppointments = allDayPanelTemplate
        .find(defaultProps.draftAppointmentComponent);

      expect(timeTableTemplateDraftAppointments)
        .toHaveLength(2);
      expect(allDayPanelTemplateAppointments)
        .toHaveLength(0);
    });
  });

  describe('Auto Scroll', () => {
    it('should call autoScroll with correct arguments', () => {
      const clientOffset = { x: 1, y: 21 };
      const { tree, onOver } = mountPlugin({});

      onOver({ payload: { id: 1 }, clientOffset });
      tree.update();

      expect(autoScroll)
        .toBeCalledWith(
          clientOffset, defaultDeps.getter.scrollingStrategy, SCROLL_SPEED_PX,
        );
    });

    it('should call autoScroll with correct arguments when scrollSpeed is specified by a user', () => {
      const clientOffset = { x: 1, y: 21 };
      const scrollSpeed = 23;
      const { tree, onOver } = mountPlugin({ scrollSpeed });

      onOver({ payload: { id: 1 }, clientOffset });
      tree.update();

      expect(autoScroll)
        .toBeCalledWith(
          clientOffset, defaultDeps.getter.scrollingStrategy, scrollSpeed,
        );
    });
  });

  describe('Drag', () => {
    it('should calculate appointment boundaries by onEnter event fire', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 20, bottom: 40 }));
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 0, bottom: 20 }));
      const deps = {
        getter: {
          timeTableElementsMeta: {
            parentRect: () => ({ height: 20, top: 20, bottom: 40 }),
            getCellRects: [{}, () => getBoundingClientRect()],
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

      const { tree, onEnter } = mountPlugin({}, deps);

      onEnter({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
    });
    it('should drag to other cell', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 20, bottom: 40 }));
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 0, bottom: 20 }));
      const deps = {
        getter: {
          timeTableElementsMeta: {
            parentRect: () => ({ height: 20, top: 20, bottom: 40 }),
            getCellRects: [{}, () => getBoundingClientRect()],
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

      const { tree, onOver } = mountPlugin({}, deps);

      onOver({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 17 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 9:30'), endDate: new Date('2018-06-25 10:30') } }, expect.any(Object), expect.any(Object));
    });
    it('should drag with save initial cursor position', () => {
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

      const { tree, onOver } = mountPlugin({});

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 9:30'), endDate: new Date('2018-06-25 10:30') } }, expect.any(Object), expect.any(Object));
    });
    it('should reset the allDay flag if it exists', () => {
      const payload = {
        id: 1,
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
        allDay: true,
      };
      cellIndex.mockImplementationOnce(() => 1);
      cellIndex.mockImplementationOnce(() => -1);
      cellType.mockImplementationOnce(() => 'horizontal');
      cellData.mockImplementationOnce(() => ({ startDate: new Date('2018-06-25 00:00'), endDate: new Date('2018-06-26 00:00') }));

      const { tree, onOver } = mountPlugin({});

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 00:00'), endDate: new Date('2018-06-26 00:00'), allDay: undefined } }, expect.any(Object), expect.any(Object));
    });
    it('should call cellIndex with array if allDayElementsMeta is an empty object', () => {
      const deps = {
        getter: {
          timeTableElementsMeta: {
            parentRect: () => ({ height: 20, top: 20, bottom: 40 }),
            getCellRects: [{}, () => ({ height: 20, top: 20, bottom: 40 })],
          },
          allDayElementsMeta: {},
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

      const { tree, onOver } = mountPlugin({}, deps);

      onOver({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();

      expect(cellIndex)
        .toBeCalledWith(deps.getter.timeTableElementsMeta.getCellRects, expect.any(Object));
      expect(cellIndex)
        .toBeCalledWith([], expect.any(Object));
    });
    it('should call calculateDraftAppointments with proper parameters', () => {
      const getBoundingClientRect = jest.fn();
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 20, bottom: 40 }));
      getBoundingClientRect.mockImplementationOnce(() => ({ height: 20, top: 40, bottom: 60 }));
      const deps = {
        getter: {
          timeTableElementsMeta: {
            parentRect: () => ({ height: 20, top: 20, bottom: 40 }),
            getCellRects: [{}, () => getBoundingClientRect()],
          },
          grouping: 'grouping',
          resources: 'resources',
          groups: 'groups',
          currentView: {},
          groupByDate: () => true,
          groupOrientation: () => 'groupOrientation',
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

      const { tree, onEnter } = mountPlugin({}, deps);

      onEnter({ payload, clientOffset: { x: 1, y: 25 } });
      tree.update();

      expect(cellData)
        .toBeCalledWith(
          1, -1,
          defaultDeps.getter.viewCellsData,
          defaultDeps.getter.allDayCellsData,
        );
      expect(calculateDraftAppointments)
        .toBeCalledWith(
          -1, [{
            dataItem: {
              id: 1,
              type: 'vertical',
              startDate: new Date('2018-06-25 10:00'),
              endDate: new Date('2018-06-25 11:00'),
            },
            start: new Date('2018-06-25 10:00'),
            end: new Date('2018-06-25 11:00'),
          }],
          defaultDeps.getter.startViewDate,
          defaultDeps.getter.endViewDate,
          defaultDeps.getter.excludedDays,
          defaultDeps.getter.viewCellsData,
          defaultDeps.getter.allDayElementsMeta,
          'vertical', 60,
          deps.getter.timeTableElementsMeta,
          'grouping', 'resources', 'groups',
          'groupOrientation',
          true,
        );
    });
  });

  describe('Drop', () => {
    it('should not change data if cursor is over and outside cells', () => {
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

      const { tree, onOver } = mountPlugin({});

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
    });
    it('should not call actions if cursor is over and inside an one cell', () => {
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

      const { tree, onOver } = mountPlugin({});

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onOver({ payload, clientOffset: { x: 1, y: 37 } });
      tree.update();

      expect(defaultDeps.action.changeAppointment)
        .toBeCalledTimes(1);
      expect(defaultDeps.action.changeAppointment)
        .toBeCalledWith({ change: { startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00') } }, expect.any(Object), expect.any(Object));
    });
    it('should commit changes on drop', () => {
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

      const { tree, onOver, onChange, onDrop } = mountPlugin({});

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onChange({ payload: undefined });
      tree.update();
      onDrop({ payload: undefined });

      expect(defaultDeps.action.finishCommitAppointment)
        .toBeCalledWith(undefined, expect.any(Object), expect.any(Object));
    });
    it('should reset cache on drop outside a cell', () => {
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

      const { tree, onOver, onChange, onLeave } = mountPlugin({
        draftAppointmentComponent: draftAppointment,
        sourceAppointmentComponent: sourceAppointment,
      }, deps);

      onOver({ payload, clientOffset: { x: 1, y: 35 } });
      tree.update();
      onLeave();
      tree.update();
      onChange({ payload: undefined });
      tree.update();

      expect(tree.find('.source').exists())
        .toBeFalsy();
      expect(tree.find('.draft').exists())
        .toBeFalsy();
    });
    it('should reset cache on drop inside a cell', () => {
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

      const { tree, onOver, onDrop } = mountPlugin({
        draftAppointmentComponent: draftAppointment,
        sourceAppointmentComponent: sourceAppointment,
      }, deps);

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
