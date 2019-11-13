import { Resource, Color } from '../index';

export interface ResourcesProps {
  /** Specifies which of several resources provides colors for appointments. */
  mainResourceName?: string;
  /** Resource data objects. */
  data: Array<Resource>;
  /** A palette used if a resource instance color is not defined. */
  palette: Array<Color | string>;
}
