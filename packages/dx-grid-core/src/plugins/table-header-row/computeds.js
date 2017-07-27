import { TABLE_HEADING_TYPE } from './constants';

export const tableRowsWithHeading = headerRows => [{ type: TABLE_HEADING_TYPE, id: 0 }, ...headerRows];
