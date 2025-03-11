import RN from '@/components/RN';

export const CoreStyle = RN.StyleSheet.create({
  flexGrow1: {
    flexGrow: 1,
  },
  flex1: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const HIT_SLOP = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};
