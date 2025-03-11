import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import RN from '../RN';
import { COLORS } from '@/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/constants/dimensions';
import { PoppinsFonts } from '@/assets/fonts/poppins.fonts';

export const Button = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  RightSection,
  style,
  titleStyle,
  loadingColor = COLORS.white,
}: {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  RightSection?: ReactNode;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  loadingColor?: string;
}) => (
  <RN.TouchableOpacity
    disabled={disabled || loading}
    onPress={onPress}
    activeOpacity={0.5}
    style={[styles.button, disabled && styles.buttonDisabled, style]}
  >
    {loading ? (
      <RN.ActivityIndicator size={'small'} color={loadingColor} />
    ) : (
      <>
        <RN.Text style={[styles.buttonText, titleStyle]}>{title}</RN.Text>
        {RightSection}
      </>
    )}
  </RN.TouchableOpacity>
);

const styles = RN.StyleSheet.create({
  button: {
    backgroundColor: COLORS.orange,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: normalizeHeight(12),
    borderRadius: normalizeWidth(16),
    minHeight: normalizeHeight(52),
  },
  buttonDisabled: {
    opacity: 0.4,
  },
  buttonText: {
    fontSize: normalizeHeight(18),
    fontFamily: PoppinsFonts.Poppins_500,
    color: COLORS.white,
  },
});
