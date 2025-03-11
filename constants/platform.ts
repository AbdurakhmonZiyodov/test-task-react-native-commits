import RN from '@/components/RN';

export const isWeb = RN.Platform.OS === 'web';
export const isAndroid = RN.Platform.OS === 'android';
export const isIOS = RN.Platform.OS === 'ios';
