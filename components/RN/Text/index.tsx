import { Text as RNText, TextProps, View } from 'react-native';
import { isNull, isUndefined } from 'lodash';

export default function Text(props: TextProps) {
  if (!props.children || isNull(props.children) || isUndefined(props.children))
    return <View />;

  return <RNText {...props} />;
}
