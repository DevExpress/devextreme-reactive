import { FactoryFn, ModifyDomainFn } from './index';

export interface ScaleProps {
  /** The scale’s name */
  name?: string;
  /** A function that constructs a custom scale */
  factory?: FactoryFn;
  /** A function that modifies the scale domain */
  modifyDomain?: ModifyDomainFn;

}

// tslint:disable-next-line: no-empty-interface
export interface ValueScaleProps extends ScaleProps {}
// tslint:disable-next-line: no-empty-interface
export interface ArgumentScaleProps extends ScaleProps {}
