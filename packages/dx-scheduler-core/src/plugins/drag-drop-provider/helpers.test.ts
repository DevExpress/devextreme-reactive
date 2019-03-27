import {
  intervalDuration, cellIndex, cellData, autoScroll, cellType,
  timeBoundariesByDrag, calculateInsidePart,
  calculateDraftAppointments, timeBoundariesByResize,
} from './helpers';
import {
  allDayRects, horizontalTimeTableRects, verticalTimeTableRects,
} from './calculate-rects';

jest.mock('./calculate-rects', () => ({
  ...require.requireActual('./calculate-rects'),
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
      { getBoundingClientRect: () => ({ top: 0, left: 0, right: 50, bottom: 50 }) },
      { getBoundingClientRect: () => ({ top: 0, left: 50, right: 100, bottom: 50 }) },
    ];

    it('should work', () => {
      expect(cellIndex(cells as Element[], { x: 10, y: 10 }))
        .toEqual(0);
    });

    it('should work without array', () => {
      expect(cellIndex([], { x: 10, y: 10 }))
        .toEqual(-1);
    });

    it('should take only one cell by condition', () => {
      expect(cellIndex(cells as Element[], { x: 50, y: 10 }))
        .toEqual(0);
    });
  });

  describe('#cellData', () => {
    const cellsData = [
      [{ startDate: new Date('2019-3-1 10:00') }, { startDate: new Date('2019-3-2 10:00') }],
      [{ startDate: new Date('2019-3-1 11:00') }, { startDate: new Date('2019-3-2 11:00') }],
    ];

    it('should work with both indexes', () => {
      expect(cellData(1, 1, cellsData).startDate)
        .toEqual(new Date('2019-3-2 00:00'));
    });

    it('should work with only time table index', () => {
      expect(cellData(2, -1, cellsData).startDate)
        .toEqual(new Date('2019-3-1 11:00'));
    });
  });

  describe('#autoScroll', () => {
    const layoutHeaderElementBase = rects => ({
      current: {
        getBoundingClientRect: () => rects,
      },
    });
    const layoutElementBase = {
      current: {
        scrollTop: 10,
        offsetTop: 10,
        clientHeight: 200,
      },
    };
    it('should scroll up', () => {
      const clientOffset = { x: 1, y: 21 };
      const layoutElement = JSON.parse(JSON.stringify(layoutElementBase));
      const layoutHeaderElement = layoutHeaderElementBase({ height: 10, top: 10 });

      autoScroll(clientOffset, layoutElement, layoutHeaderElement);
      expect(layoutElement.current.scrollTop)
        .toBe(-20);
    });

    it('should scroll down', () => {
      const clientOffset = { x: 1, y: 161 };
      const layoutElement = JSON.parse(JSON.stringify(layoutElementBase));
      const layoutHeaderElement = layoutHeaderElementBase({ height: 10, top: 10 });

      autoScroll(clientOffset, layoutElement, layoutHeaderElement);
      expect(layoutElement.current.scrollTop)
        .toBe(40);
    });

    it('should not scroll up if cursor is under of header element', () => {
      const clientOffset = { x: 1, y: 25 };
      const layoutElement = { current: { scrollTop: 0 } };
      const layoutHeaderElement = layoutHeaderElementBase({ height: 20, top: 10 });

      autoScroll(clientOffset, layoutElement, layoutHeaderElement);
      expect(layoutElement.current.scrollTop)
        .toBe(0);
    });
  });

  describe('#timeBoundariesByResize', () => {
    it('should not resize if appointment type and cell type are equal', () => {
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

    it('should resize if appointment type is vertical and resize handle is top', () => {
      const targetType = 'vertical';
      const payload = {
        type: 'resize-top',
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

    it('should resize if appointment type is vertical and resize handle is bottom', () => {
      const targetType = 'vertical';
      const payload = {
        type: 'resize-bottom',
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

    it('should resize if appointment type is horizontal and resize handle is top', () => {
      const targetType = 'horizontal';
      const payload = {
        type: 'resize-top',
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

    it('should resize if appointment type is horizontal and resize handle is bottom', () => {
      const targetType = 'horizontal';
      const payload = {
        type: 'resize-bottom',
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
        startDate: new Date('2018-06-25'), endDate: new Date('2018-06-26'),
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
          appointmentStartTime: new Date('2018-06-25'),
          appointmentEndTime: new Date('2018-06-26'),
          offsetTimeTop: 1270800,
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
      const timeTableCells = [{ getBoundingClientRect: () => ({ top: 10, height: 20 }) }];
      expect(calculateInsidePart(15, timeTableCells, tileTableIndex))
        .toEqual(0);
    });
    it('should return bottom', () => {
      const tileTableIndex = 0;
      const timeTableCells = [{ getBoundingClientRect: () => ({ top: 10, height: 20 }) }];
      expect(calculateInsidePart(25, timeTableCells, tileTableIndex))
        .toEqual(1);
    });
  });

  describe('#calculateDraftAppointments', () => {
    const allDayIndex = 0;
    const draftAppointments = [];
    const startViewDate = new Date();
    const endViewDate = new Date();
    const excludedDays = [];
    const viewCellsData = [];
    const allDayCells = [];
    const targetType = 'vertical';
    const cellDurationMinutes = 0;
    const timeTableCells = 0;
    it('should return only one array', () => {
      expect(calculateDraftAppointments(
        allDayIndex, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        targetType, cellDurationMinutes, timeTableCells,
      ))
      .toEqual({
        allDayDraftAppointments: [{}],
        timeTableDraftAppointments: [],
      });
    });

    it('should return time table array', () => {
      const nextAllDayIndex = -1;
      expect(calculateDraftAppointments(
        nextAllDayIndex, draftAppointments, startViewDate,
        endViewDate, excludedDays, viewCellsData, allDayCells,
        targetType, cellDurationMinutes, timeTableCells,
      ))
      .toEqual({
        allDayDraftAppointments: [],
        timeTableDraftAppointments: [{}],
      });
    });
  });
});
