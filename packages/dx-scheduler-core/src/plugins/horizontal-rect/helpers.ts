import { GetCellRectHorizontalFn, GetHorizontalRectByAppointmentDataFn } from '../../types';
import { getAllDayCellIndexByAppointmentData } from '../all-day-panel/helpers';
import { getMonthCellIndexByAppointmentData } from '../month-view/helpers';

const TOP_CELL_OFFSET = 0.32;
const CELL_BOUND_OFFSET_PX = 1;

const getCellRect: GetCellRectHorizontalFn = (
  date, appointment, viewCellsData, viewMetaData, cellElementsMeta, takePrev, multiline,
) => {
  const cellIndex = multiline
    ? getMonthCellIndexByAppointmentData(
      viewCellsData, viewMetaData, date, appointment, takePrev,
    ) : getAllDayCellIndexByAppointmentData(
      viewCellsData, viewMetaData, date, appointment, takePrev,
    );

  const {
    top,
    left,
    width,
    height,
  } = cellElementsMeta.getCellRects[cellIndex]();
  const parentRect = cellElementsMeta.parentRect();
  return {
    top,
    left,
    width,
    height,
    parentRect,
  };
};

export const getHorizontalRectByAppointmentData: GetHorizontalRectByAppointmentDataFn = (
  appointment,
  viewMetaData,
  {
    multiline,
    viewCellsData,
    cellElementsMeta,
  },
) => {
  const firstCellRect = getCellRect(
    appointment.start.toDate(), appointment, viewCellsData,
    viewMetaData, cellElementsMeta, false, multiline,
  );
  const lastCellRect = getCellRect(
    appointment.end.toDate(), appointment, viewCellsData,
    viewMetaData, cellElementsMeta, true, multiline,
  );

  const top = firstCellRect.top + (firstCellRect.height * TOP_CELL_OFFSET);
  const height = firstCellRect.height - (firstCellRect.height * TOP_CELL_OFFSET);

  return {
    top: top - firstCellRect.parentRect.top,
    left: (firstCellRect.left - firstCellRect.parentRect.left) + CELL_BOUND_OFFSET_PX,
    width: ((lastCellRect.left - firstCellRect.left) + firstCellRect.width) - CELL_BOUND_OFFSET_PX,
    height,
    parentWidth: firstCellRect.parentRect.width,
  };
};
