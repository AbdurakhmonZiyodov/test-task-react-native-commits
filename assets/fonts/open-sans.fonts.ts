import {
  OpenSans_300Light,
  OpenSans_400Regular,
  OpenSans_500Medium,
  OpenSans_600SemiBold,
  OpenSans_700Bold,
} from '@expo-google-fonts/open-sans';

export enum OpenSansFonts {
  OpenSans_300 = 'OpenSans_300Light',
  OpenSans_400 = 'OpenSans_400Regular',
  OpenSans_500 = 'OpenSans_500Medium',
  OpenSans_600 = 'OpenSans_600SemiBold',
  OpenSans_700 = 'OpenSans_700Bold',
}
export function getOpenSansFonts() {
  return {
    [OpenSansFonts.OpenSans_300]: OpenSans_300Light,
    [OpenSansFonts.OpenSans_400]: OpenSans_400Regular,
    [OpenSansFonts.OpenSans_500]: OpenSans_500Medium,
    [OpenSansFonts.OpenSans_600]: OpenSans_600SemiBold,
    [OpenSansFonts.OpenSans_700]: OpenSans_700Bold,
  };
}
