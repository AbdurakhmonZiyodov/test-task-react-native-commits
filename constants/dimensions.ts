import { PixelRatio } from 'react-native';
import { isIOS } from './platform';
import RN from '@/components/RN';

const { width, height } = RN.Dimensions.get('window');

const SIZES = {
  width,
  height,
};

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const scaleWidth = SIZES.width / BASE_WIDTH;
const scaleHeight = SIZES.height / BASE_HEIGHT;

const normalizeWidth = (size: number) => {
  const newSize = size * scaleWidth;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return isIOS ? normalizedSize : normalizedSize - 1;
};

const normalizeHeight = (size: number) => {
  const newSize = size * scaleHeight;
  const normalizedSize = Math.round(PixelRatio.roundToNearestPixel(newSize));

  return isIOS ? normalizedSize : normalizedSize - 1;
};

export { normalizeWidth, normalizeHeight, SIZES };
