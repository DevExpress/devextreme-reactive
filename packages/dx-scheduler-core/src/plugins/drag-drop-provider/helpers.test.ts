import {
  intervalDuration, cellIndex, cellData, autoScroll, cellType,
  timeBoundariesByDrag, calculateInsidePart,
  calculateDraftAppointments, timeBoundariesByResize,
  calculateAppointmentGroups, appointmentDragged,
} from './helpers';
import {
  allDayRects, horizontalTimeTableRects, verticalTimeTableRects,
} from '../common/calculate-rects';

jest.mock('../common/calculate-rects', () => ({
  ...jest.requireActual('../common/calculate-rects'),
  allDayRects: jest.fn(),
  verticalTimeTableRects: jest.fn(),
  horizontalTimeTableRects: jest.fn(),
}));

describe('DragDropProvider', () => {
  beforeEach(() => {
    allDayRects.mockImplementation(() => [{}]);
    verticalTimeTableRects.mockImplementation(() => [{}]);
    horizontalTimeTableRects.mockImplementation(() => [{}]);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#cellType', () => {
    it('should work with day cell interval', () => {
      const data = {
        startDate: new Date('2019-3-6'),
        endDate: new Date('2019-3-7'),
      };
      expect(cellType(data))
        .toEqual('horizontal');
    });
    it('should work with long cell interval', () => {
      const data = {
        startDate: new Date('2019-3-5'),
        endDate: new Date('2019-3-7'),
      };
      expect(cellType(data))
        .toEqual('horizontal');
    });
    it('should work with short cell interval', () => {
      const data = {
        startDate: new Date('2019-3-5'),
        endDate: new Date('2019-3-5 23:59:59'),
      };
      expect(cellType(data))
        .toEqual('vertical');
    });
  });

  describe('#intervalDuration', () => {
    const data = {
      startDate: new Date('2019-3-1 10:00'),
      endDate: new Date('2019-3-1 11:00'),
    };
    it('should work with minutes', () => {
      expect(intervalDuration(data, 'minutes'))
        .toEqual(60);
    });
    it('should work with seconds', () => {
      expect(intervalDuration(data, 'seconds'))
        .toEqual(60 * 60);
    });
  });

  describe('#cellIndex', () => {
    const cells = [
      () => ({ top: 0, left: 0, right: 50, bottom: 50 }),
      () => ({ top: 0, left: 50, right: 100, bottom: 50 }),
    ];
    it('should work', () => {
      expect(cellIndex(cells, { x: 10, y: 10 }))
        .toEqual(0);
    });
    it('should work with empty array', () => {
      expect(cellIndex([], { x: 10, y: 10 }))
        .toEqual(-1);
    });
    it('should take only one cell by condition', () => {
      expect(cellIndex(cells, { x: 50, y: 10 }))
        .toEqual(0);
    });
  });

  describe('#cellData', () => {
    const cellsData = [
      [{ startDate: new Date('2019-3-1 10:00') }, { startDate: new Date('2019-3-2 10:00') }],
      [{ startDate: new Date('2019-3-1 11:00') }, { startDate: new Date('2019-3-2 11:00') }],
    ];
    const allDayCellsData = [
      [{ startDate: new Date('2019-3-1') }, { startDate: new Date('2019-3-2') }],
      [{ startDate: new Date('2019-3-3') }, { startDate: new Date('2019-3-4') }],
    ];
    it('should work with both indexes', () => {
      expect(cellData(1, 3, cellsData, allDayCellsData).startDate)
        .toEqual(new Date('2019-3-4'));
    });
    it('should work with only timetable index', () => {
      expect(cellData(2, -1, cellsData, allDayCellsData).startDate)
        .toEqual(new Date('2019-3-1 11:00'));
    });
  });

  describe('#autoScroll', () => {
    const scrollAPI = {
      topBoundary: 0,
      bottomBoundary: 1000,
      leftBoundary: 0,
      rightBoundary: 1000,
      changeVerticalScroll: jest.fn(),
      changeHorizontalScroll: jest.fn(),
    };
    const scrollSpeed = 25;

    it('should scroll up', () => {
      const clientOffset = { x: 1, y: 21 };

      autoScroll(clientOffset, scrollAPI, scrollSpeed);
      expect(scrollAPI.changeVerticalScroll)
        .toBeCalledWith(-scrollSpeed);
    });
    it('should scroll down', () => {
      const clientOffset = { x: 1, y: 960 };

      autoScroll(clientOffset, scrollAPI, scrollSpeed);
      expect(scrollAPI.changeVerticalScroll)
        .toBeCalledWith(scrollSpeed);
    });
    it('should not scroll up if cursor is above of top boundary', () => {
      const clientOffset = { x: 1, y: -10 };

      autoScroll(clientOffset, scrollAPI, scrollSpeed);
      expect(scrollAPI.changeVerticalScroll)
        .not.toBeCalled();
    });
    it('should scroll left', () => {
      const clientOffset = { x: 21, y: 1 };

      autoScroll(clientOffset, scrollAPI, scrollSpeed);
      expect(scrollAPI.changeHorizontalScroll)
        .toBeCalledWith(-scrollSpeed);
    });
    it('should scroll right', () => {
      const clientOffset = { x: 960, y: 1 };

      autoScroll(clientOffset, scrollAPI, scrollSpeed);
      expect(scrollAPI.changeHorizontalScroll)
        .toBeCalledWith(scrollSpeed);
    });
    it('should not scroll left if cursor is to the left of the left boundary', () => {
      const clientOffset = { x: -10, y: 1 };

      autoScroll(clientOffset, scrollAPI, scrollSpeed);
      expect(scrollAPI.changeHorizontalScroll)
        .not.toBeCalled();
    });
  });

  describe('#timeBoundariesByResize', () => {
    it('should not resize if appointment type and cell type are different', () => {
      const targetType = 'vertical';
      const payload = {
        type: 'resize-top',
        appointmentType: 'horizontal',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00'),
      };
      const cellDurationMinutes = 60;
      const insidePart = 0;

      const result = timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      );

      expect(result)
        .toEqual({
          appointmentStartTime: undefined,
          appointmentEndTime: undefined,
        });
    });
    it('should resize if appointment type is vertical and resize handle is start', () => {
      const targetType = 'vertical';
      const payload = {
        type: 'resize-start',
        appointmentType: targetType,
        startDate: new Date('2018-06-25 11:00'),
        endDate: new Date('2018-06-25 11:30'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00'),
      };
      const cellDurationMinutes = 60;
      let insidePart = 1;

      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual({
        appointmentStartTime: new Date('2018-06-25 10:30'),
        appointmentEndTime: new Date('2018-06-25 11:30'),
      });

      insidePart = 0;
      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, 0,
      )).toEqual({
        appointmentStartTime: new Date('2018-06-25 10:00'),
        appointmentEndTime: new Date('2018-06-25 11:30'),
      });
    });
    it('should resize if appointment type is vertical and resize handle is end', () => {
      const targetType = 'vertical';
      const payload = {
        type: 'resize-end',
        appointmentType: targetType,
        startDate: new Date('2018-06-25 9:00'),
        endDate: new Date('2018-06-25 9:30'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00'),
      };
      const cellDurationMinutes = 60;
      let insidePart = 1;

      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual({
        appointmentStartTime: new Date('2018-06-25 9:00'),
        appointmentEndTime: new Date('2018-06-25 11:00'),
      });

      insidePart = 0;
      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual({
        appointmentStartTime: new Date('2018-06-25 9:00'),
        appointmentEndTime: new Date('2018-06-25 10:30'),
      });
    });
    it('should resize if appointment type is horizontal and resize handle is start', () => {
      const targetType = 'horizontal';
      const payload = {
        type: 'resize-start',
        appointmentType: targetType,
        startDate: new Date('2018-06-27 10:00'),
        endDate: new Date('2018-06-29 11:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 00:00'), endDate: new Date('2018-06-26 00:00'),
      };
      const cellDurationMinutes = 60 * 24;
      let insidePart = 1;

      const result = {
        appointmentStartTime: new Date('2018-06-25 00:00'),
        appointmentEndTime: new Date('2018-06-29 11:00'),
      };
      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual(result);

      insidePart = 0;
      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual(result);
    });
    it('should resize if appointment type is horizontal and resize handle is end', () => {
      const targetType = 'horizontal';
      const payload = {
        type: 'resize-end',
        appointmentType: targetType,
        startDate: new Date('2018-06-22 10:00'),
        endDate: new Date('2018-06-24 11:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 00:00'), endDate: new Date('2018-06-26 00:00'),
      };
      const cellDurationMinutes = 60 * 24;
      let insidePart = 1;

      const result = {
        appointmentStartTime: new Date('2018-06-22 10:00'),
        appointmentEndTime: new Date('2018-06-26 00:00'),
      };
      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual(result);

      insidePart = 0;
      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual(result);
    });
    it('should not resize if draft appointment duration less 1 minute', () => {
      const targetType = 'vertical';
      const payload = {
        type: 'resize-bottom',
        appointmentType: targetType,
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 8:00'), endDate: new Date('2018-06-25 9:00'),
      };
      const cellDurationMinutes = 60 * 24;
      const insidePart = 1;

      expect(timeBoundariesByResize(
        payload, targetData, targetType, cellDurationMinutes, insidePart,
      )).toEqual({
        appointmentStartTime: payload.startDate,
        appointmentEndTime: payload.endDate,
      });
    });
  });

  describe('#timeBoundariesByDrag', () => {
    it('should work with vertical appointment and vertical cell', () => {
      const payload = {
        type: 'vertical',
        startDate: new Date('2018-06-25 10:00'),
        endDate: new Date('2018-06-25 11:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00'),
      };
      const targetType = 'vertical';
      const cellDurationMinutes = 60;
      const insidePart = 0;
      const offsetTimeTopBase = null;

      const result = timeBoundariesByDrag(
        payload, targetData, targetType,
        cellDurationMinutes, insidePart, offsetTimeTopBase,
      );
      expect(result)
        .toEqual({
          appointmentStartTime: new Date('2018-06-25 10:00'),
          appointmentEndTime: new Date('2018-06-25 11:00'),
          offsetTimeTop: 0,
        });
    });
    it('should work with horizontal appointment and horizontal cell', () => {
      const payload = {
        type: 'horizontal',
        startDate: new Date('2018-06-25 00:00'),
        endDate: new Date('2018-06-26 00:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 00:00'), endDate: new Date('2018-06-26 00:00'),
      };
      const targetType = 'horizontal';
      const cellDurationMinutes = 24 * 60;
      const insidePart = 0;
      const offsetTimeTopBase = null;

      const result = timeBoundariesByDrag(
        payload, targetData, targetType,
        cellDurationMinutes, insidePart, offsetTimeTopBase,
      );
      expect(result)
        .toEqual({
          appointmentStartTime: new Date('2018-06-25 00:00'),
          appointmentEndTime: new Date('2018-06-26 00:00'),
          offsetTimeTop: 0,
        });
    });
    it('should work with vertical appointment and horizontal cell', () => {
      const payload = {
        type: 'vertical',
        startDate: new Date('2018-06-10 10:00'),
        endDate: new Date('2018-06-10 11:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 00:00'), endDate: new Date('2018-06-26 00:00'),
      };
      const targetType = 'horizontal';
      const cellDurationMinutes = 24 * 60;
      const insidePart = 0;
      const offsetTimeTopBase = null;

      const result = timeBoundariesByDrag(
        payload, targetData, targetType,
        cellDurationMinutes, insidePart, offsetTimeTopBase,
      );
      expect(result)
        .toEqual({
          appointmentStartTime: new Date('2018-06-25 00:00'),
          appointmentEndTime: new Date('2018-06-26 00:00'),
          offsetTimeTop: 0,
        });
    });
    it('should work with horizontal appointment and vertical cell', () => {
      const payload = {
        type: 'horizontal',
        startDate: new Date('2018-06-10 00:00'),
        endDate: new Date('2018-06-10 00:00'),
      };
      const targetData = {
        startDate: new Date('2018-06-25 10:00'), endDate: new Date('2018-06-25 11:00'),
      };
      const targetType = 'vertical';
      const cellDurationMinutes = 60;
      const insidePart = 0;
      const offsetTimeTopBase = null;

      const result = timeBoundariesByDrag(
        payload, targetData, targetType,
        cellDurationMinutes, insidePart, offsetTimeTopBase,
      );
      expect(result)
        .toEqual({
          appointmentStartTime: new Date('2018-06-25 10:00'),
          appointmentEndTime: new Date('2018-06-25 11:00'),
          offsetTimeTop: 1332000,
        });
    });
  });

  describe('#calculateInsidePart', () => {
    it('should not throw error without timeTableIndex', () => {
      expect(() => calculateInsidePart(undefined, undefined, undefined)).not.toThrow();
    });
    it('should return top', () => {
      const tileTableIndex = 0;
      const timeTableCellsRects = [() => ({ top: 10, height: 20 })];
      expect(calculateInsidePart(15, timeTableCellsRects, tileTableIndex))
        .toEqual(0);
    });
    it('should return bottom', () => {
      const tileTableIndex = 0;
      const timeTableCellsRects = [() => ({ top: 10, height: 20 })];
      expect(calculateInsidePart(25, timeTableCellsRects, tileTableIndex))
        .toEqual(1);
    });
  });

  describe('#calculateDraftAppointments', () => {
    const allDayIndex = 0;
    const draftAppointments = [{}];
    const startViewDate = 'startViewDate';
    const endViewDate = 'endViewDate';
    const excludedDays = 'excludedDays';
    const viewCellsData = 'viewCellsData';
    const allDayCells = { getParentRect: () => undefined, getCellRects: [] };
    const targetType = 'vertical';
    const cellDurationMinutes = 'cellDurationMinutes';
    const timeTableCells = 'timeTableCells';
    const grouping = 'grouping';
    const resources = 'resources';
    const groups = 'groups';
    const groupOrientation = 'groupOrientation';
    const groupByDate = 'groupByDate';
    it('should return all day array while drag above at AllDayPanel', () => {
      calculateDraftAppointments(
        allDayIndex, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        'horizontal', cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      );
      expect(allDayRects)
        .toBeCalledWith([{ allDay: true }], startViewDate, endViewDate,
          excludedDays, viewCellsData, allDayCells, grouping, resources,
          groups, groupOrientation, groupByDate,
        );
    });
    it('should format appointment if allDay flag exists', () => {
      expect(calculateDraftAppointments(
        allDayIndex, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        'horizontal', cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      ))
      .toEqual({
        allDayDraftAppointments: [{}],
        timeTableDraftAppointments: [],
      });
    });
    // tslint:disable-next-line:max-line-length
    it('should return all day array while resize vertical appointment above then 23 hours if AllDayPanel exists', () => {
      const nextAllDayIndex = -1;
      const nextAllDayCells = {
        getParentRect: () => undefined, getCellRects: [{}], // allDayPanel exists
      };
      const longDraftAppointment = [{
        dataItem: {
          startDate: new Date('2018-06-10 12:00'),
          endDate: new Date('2018-06-11 13:00'),
        },
      }];

      expect(calculateDraftAppointments(
        nextAllDayIndex, longDraftAppointment, startViewDate,
        endViewDate, excludedDays, viewCellsData, nextAllDayCells,
        targetType, cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      ))
      .toEqual({
        allDayDraftAppointments: [{}],
        timeTableDraftAppointments: [],
      });

      expect(calculateDraftAppointments(
        nextAllDayIndex, longDraftAppointment, startViewDate,
        endViewDate, excludedDays, viewCellsData, nextAllDayCells,
        'horizontal', cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      ))
      .toEqual({
        allDayDraftAppointments: [],
        timeTableDraftAppointments: [{}],
      });

      const shortAppointment = [{
        dataItem: {
          startDate: new Date('2018-06-10 12:00'),
          endDate: new Date('2018-06-10 13:00'),
        },
      }];

      expect(calculateDraftAppointments(
        nextAllDayIndex, shortAppointment, startViewDate,
        endViewDate, excludedDays, viewCellsData, nextAllDayCells,
        targetType, cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      ))
      .toEqual({
        allDayDraftAppointments: [],
        timeTableDraftAppointments: [{}],
      });
    });
    it('should return timetable array', () => {
      const nextAllDayIndex = -1;
      expect(calculateDraftAppointments(
        nextAllDayIndex, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        targetType, cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      ))
      .toEqual({
        allDayDraftAppointments: [],
        timeTableDraftAppointments: [{}],
      });
    });
    it('should work with groups', () => {
      calculateDraftAppointments(
        -1, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        'vertical', cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      );
      expect(verticalTimeTableRects)
        .toBeCalledWith(
          [{}], startViewDate, endViewDate, excludedDays, viewCellsData, cellDurationMinutes,
          timeTableCells, grouping, resources, groups, groupOrientation, groupByDate,
        );

      calculateDraftAppointments(
        1, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        'horizontal', cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      );
      expect(allDayRects)
        .toBeCalledWith(
          [{ allDay: true }], startViewDate, endViewDate, excludedDays, viewCellsData,
          allDayCells, grouping, resources, groups, groupOrientation, groupByDate,
        );

      calculateDraftAppointments(
        -1, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        'horizontal', cellDurationMinutes, timeTableCells,
        grouping, resources, groups, groupOrientation, groupByDate,
      );
      expect(verticalTimeTableRects)
        .toBeCalledWith(
          [{}], startViewDate, endViewDate, excludedDays, viewCellsData, cellDurationMinutes,
          timeTableCells, grouping, resources, groups, groupOrientation, groupByDate,
        );
    });
  });

  describe('#calculateAppointmentGroups', () => {
    const cellGroupingInfo = [{
      fieldName: 'test1',
      id: 1,
    }, {
      fieldName: 'test2',
      id: 2,
    }];
    it('should return an empty object if cellGroupingInfo is undefined', () => {
      expect(calculateAppointmentGroups(undefined, undefined, undefined))
        .toEqual({});
    });
    it('should set the groups defined in cellGroupingInfo', () => {
      const resources = [{
        fieldName: 'test1',
        allowMultiple: false,
      }, {
        fieldName: 'test2',
        allowMultiple: false,
      }];
      expect(calculateAppointmentGroups(cellGroupingInfo, resources, undefined))
        .toEqual({
          test1: 1,
          test2: 2,
        });
    });
    it('shouldn\'t change appointment groups if the appointment already contains it', () => {
      const resources = [{
        fieldName: 'test1',
        allowMultiple: true,
      }, {
        fieldName: 'test2',
        allowMultiple: false,
      }];
      const appointmentData = {
        test1: [1, 2],
        test2: 2,
      };
      expect(calculateAppointmentGroups(cellGroupingInfo, resources, appointmentData))
        .toEqual({
          test1: [1, 2],
          test2: 2,
        });
    });
    it('should change replace multiple resource group with an array with a single instance', () => {
      const resources = [{
        fieldName: 'test1',
        allowMultiple: true,
      }, {
        fieldName: 'test2',
        allowMultiple: false,
      }];
      const appointmentData = {
        test1: [2, 3],
        test2: 2,
      };
      expect(calculateAppointmentGroups(cellGroupingInfo, resources, appointmentData))
        .toEqual({
          test1: [1],
          test2: 2,
        });
    });
  });
  describe('#calculateAppointmentGroups', () => {
    it('should return false if dates and groups are equal', () => {
      expect(appointmentDragged(
        new Date(2019), new Date(2019), new Date(2020), new Date(2020), {}, {},
      ))
        .toBeFalsy();
    });
    it('should return true if dates or groups are not equal', () => {
      expect(appointmentDragged(
        new Date(2019), new Date(2020), new Date(2020), new Date(2020), {}, {},
      ))
        .toBeTruthy();
      expect(appointmentDragged(
        new Date(2019), new Date(2019), new Date(2019), new Date(2020), {}, {},
      ))
        .toBeTruthy();
      expect(appointmentDragged(
        new Date(2019), new Date(2019), new Date(2020), new Date(2020), { test: 1 }, { test: 2 },
      ))
        .toBeTruthy();
    });
    it('should work with arrays', () => {
      expect(appointmentDragged(
        new Date(2019), new Date(2019), new Date(2020), new Date(2020), [1], [2],
      ))
        .toBeTruthy();
      expect(appointmentDragged(
        new Date(2019), new Date(2019), new Date(2020), new Date(2020), [1], [1],
      ))
        .toBeFalsy();
    });
  });
});
