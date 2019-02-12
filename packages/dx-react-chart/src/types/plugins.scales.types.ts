export interface ScaleProps {
  // The scale’s name
  name: string;
  // A function that constructs a custom scale
  factory?: any;
  // A function that modifies the scale domain
  modifyDomain?: (domain: any[]) => any[];
}
