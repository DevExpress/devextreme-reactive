import * as React from 'react';
import { Plugin, Getter } from '@devexpress/dx-react-core';


const getDomain = ({ axes }) =>
  axes.reduce((acc, { name, min, max }) => {
    acc[name] = [min, max];
    return acc;
  }, {});

export const AxesDomain = () => (
  <Plugin name="AxesDomain">
    <Getter name="domains" computed={getDomain} />
  </Plugin>
);
