import {
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export enum PoppinsFonts {
  Poppins_300 = 'Poppins_300Light',
  Poppins_400 = 'Poppins_400Regular',
  Poppins_500 = 'Poppins_500Medium',
  Poppins_600 = 'Poppins_600SemiBold',
  Poppins_700 = 'Poppins_700Bold',
}
export function getPoppinsFonts() {
  return {
    [PoppinsFonts.Poppins_300]: Poppins_300Light,
    [PoppinsFonts.Poppins_400]: Poppins_400Regular,
    [PoppinsFonts.Poppins_500]: Poppins_500Medium,
    [PoppinsFonts.Poppins_600]: Poppins_600SemiBold,
    [PoppinsFonts.Poppins_700]: Poppins_700Bold,
  };
}
