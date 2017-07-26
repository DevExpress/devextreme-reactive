import { HEADING_TYPE } from './constants';

export const tableRowsWithHeading = headerRows => [{ type: HEADING_TYPE, id: 0 }, ...headerRows];
