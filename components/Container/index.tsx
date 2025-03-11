import { FC, ReactNode } from 'react';
import { ScrollViewProps, StyleProp, ViewStyle } from 'react-native';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import RN from '../RN';
import { ImageBackground } from 'expo-image';
import { isEmpty } from 'lodash';
import { COLORS } from '@/constants/colors';
import { CoreStyle } from '@/styles/global';
import { normalizeHeight, normalizeWidth } from '@/constants/dimensions';

interface ContainerProps extends SafeAreaViewProps {
  backgroundColor?: string;
  Header?: ReactNode;
  Footer?: ReactNode;
  isScroll?: boolean;
  mainStyle?: StyleProp<ViewStyle>;
  refreshControl?: ScrollViewProps['refreshControl'];
  backgroundImageUri?: string;
}

const Container: FC<ContainerProps> = ({
  backgroundColor = COLORS.white,
  isScroll = false,
  Header,
  Footer,
  backgroundImageUri,
  children,
  mainStyle,
  refreshControl,
  ...resOfProps
}) => {
  const Main = isScroll ? RN.ScrollView : RN.View;
  const Background = isEmpty(backgroundImageUri) ? RN.View : ImageBackground;
  return (
    <Background
      style={CoreStyle.flex1}
      blurRadius={10}
      source={{
        uri: backgroundImageUri,
      }}
    >
      <SafeAreaView
        {...resOfProps}
        style={[styles.container, resOfProps.style, { backgroundColor }]}
      >
        {Header}
        <Main
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          style={mainStyle}
          refreshControl={refreshControl}
        >
          {children}
        </Main>
        {Footer}
      </SafeAreaView>
    </Background>
  );
};

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalizeWidth(16),
    paddingVertical: normalizeHeight(10),
  },
});

export default Container;
