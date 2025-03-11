import { getInterFonts } from './inter.fonts';
import { getOpenSansFonts } from './open-sans.fonts';
import { getPoppinsFonts } from './poppins.fonts';

export const getAllFonts = () =>
  Object.assign({}, getInterFonts(), getPoppinsFonts(), getOpenSansFonts());
