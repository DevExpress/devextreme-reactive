import { ScaleObject } from './index';

export interface ScaleProps {
  /** The scale’s name */
  name?: string;
  /** A function that constructs a custom scale */
  factory?: any;
  /** A function that modifies the scale domain */
  modifyDomain?: (domain: any[]) => ScaleObject;

}

// tslint:disable-next-line: no-empty-interface
export interface ValueScaleProps extends ScaleProps {}
// tslint:disable-next-line: no-empty-interface
export interface ArgumentScaleProps extends ScaleProps {}
