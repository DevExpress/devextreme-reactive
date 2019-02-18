import { ScaleObject } from './index';

/** @internal */
export interface ScaleProps extends ArgumentScaleProps {
  /** The scale’s name */
  name: string;
}

export interface ValueScaleProps extends ArgumentScaleProps {
  /** The scale’s name */
  name?: string;
}

export interface ArgumentScaleProps {
  /** A function that constructs a custom scale */
  factory?: any;
  /** A function that modifies the scale domain */
  modifyDomain?: (domain: any[]) => ScaleObject;
}
