import * as React from 'react';

export const Content = ({ text, targetItem, ...restProps }) => (<span {...restProps}>{text}</span>);
