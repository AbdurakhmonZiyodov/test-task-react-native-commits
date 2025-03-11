import {
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export enum InterFonts {
  Inter_300 = 'Inter_300Light',
  Inter_400 = 'Inter_400Regular',
  Inter_500 = 'Inter_500Medium',
  Inter_600 = 'Inter_600SemiBold',
  Inter_700 = 'Inter_700Bold',
}
export function getInterFonts() {
  return {
    [InterFonts.Inter_300]: Inter_300Light,
    [InterFonts.Inter_400]: Inter_400Regular,
    [InterFonts.Inter_500]: Inter_500Medium,
    [InterFonts.Inter_600]: Inter_600SemiBold,
    [InterFonts.Inter_700]: Inter_700Bold,
  };
}
