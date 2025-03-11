import { ViewStyle } from 'react-native';
import { StylePropsKeys, styleProps } from './ViewTypes';

export class ViewHelper {
  static getStyles = (props?: StylePropsKeys): ViewStyle => {
    let cssProperties: ViewStyle = {};

    if (!props) {
      return {};
    }

    Object.keys(props).forEach((prop: string) => {
      const cssProperty = styleProps[prop as keyof StylePropsKeys];
      const cssPropertyValue = props[prop as keyof StylePropsKeys];

      if (cssProperty && cssPropertyValue !== undefined) {
        // @ts-expect-error
        cssProperties[cssProperty] = cssPropertyValue;
      }
    });

    return cssProperties;
  };
}
