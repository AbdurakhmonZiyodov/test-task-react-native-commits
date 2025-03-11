import React from 'react';
import { View as RNVIew, ViewProps } from 'react-native';
import { ViewHelper } from './ViewHelper';
import { StylePropsKeys } from './ViewTypes';

export interface IViewProps extends ViewProps, StylePropsKeys {}

const View: React.FC<IViewProps> = (props) => {
  const { style, children, ...otherProps } = props;

  return (
    <RNVIew style={[ViewHelper.getStyles(otherProps), style]} {...otherProps}>
      {children}
    </RNVIew>
  );
};

export default View;
