import RN from '@/components/RN';
import { has } from 'lodash';
import React, { FC, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import MaskInput, { MaskInputProps } from 'react-native-mask-input';

import {
  StyleProp,
  StyleSheet,
  TextInputProps,
  TextStyle,
  ViewStyle,
  TextInput as RNTextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useVisibility from '@/hooks/useVisibility';
import { COLORS } from '@/constants/colors';
import { normalizeHeight, normalizeWidth } from '@/constants/dimensions';
import { PoppinsFonts } from '@/assets/fonts/poppins.fonts';

export type ITextInputProps = TextInputProps & {
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
  numberOfLines?: number;
  value: string;
  placeholder?: string;
  onChangeText(value: string): void;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  secureTextEntry?: boolean;
  multiline?: boolean;
  error?: FieldError;
  inputRef?: React.RefObject<RNTextInput>;
  onChange?(val: string): void;
  shouldTriggerError?: boolean;
  name: string;
  isMask?: boolean;
  mask?: MaskInputProps['mask'];
};

export const TextInput: FC<ITextInputProps> = ({
  value,
  onChangeText,
  placeholder,
  containerStyle,
  inputStyle,
  LeftElement,
  RightElement,
  numberOfLines = 1,
  secureTextEntry,
  multiline = false,
  error,
  inputRef,
  onChange,
  shouldTriggerError = false,
  onFocus,
  onBlur,
  name,
  defaultValue,
  isMask = false,
  mask,
  ...resOfProps
}) => {
  const focusVisibility = useVisibility();
  const passwordVisibility = useVisibility(true);
  const shouldDisplayError = !!error && !!shouldTriggerError;
  const isPasswordInput = name === 'password' || name === 'passwordConfirm';

  const Input = isMask ? MaskInput : RN.TextInput;

  const onInputChangeText = (text: string) => {
    onChange?.(text);
    onChangeText?.(text);
  };

  const onInputFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    focusVisibility.show();
    !!onFocus && onFocus(e);
  };

  const onInputBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    focusVisibility.hide();
    !!onBlur && onBlur(e);
  };

  const renderEyeIcon = () => (
    <RN.TouchableOpacity onPress={passwordVisibility.toggle}>
      <Ionicons
        name={passwordVisibility.visible ? 'eye' : 'eye-off'}
        size={24}
        color={COLORS.black3}
      />
    </RN.TouchableOpacity>
  );
  return (
    <RN.View>
      <RN.View
        style={[
          styles.container,
          shouldDisplayError && styles.inputError,
          containerStyle,
        ]}
      >
        {LeftElement}
        <Input
          mask={mask}
          placeholder={placeholder}
          value={value}
          onChangeText={onInputChangeText}
          placeholderTextColor={COLORS.black3}
          style={[styles.input, inputStyle]}
          autoCapitalize={'none'}
          autoCorrect={false}
          numberOfLines={numberOfLines}
          {...(isPasswordInput && {
            secureTextEntry: passwordVisibility.visible,
          })}
          ref={inputRef}
          multiline={multiline}
          onFocus={onInputFocus}
          onBlur={onInputBlur}
          {...resOfProps}
        />
        {isPasswordInput ? renderEyeIcon() : RightElement}
      </RN.View>
      {!!error && has(error, 'message') && shouldDisplayError && (
        <RN.View pl={3}>
          <RN.Text style={styles.error}>{error.message}</RN.Text>
        </RN.View>
      )}
    </RN.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: normalizeWidth(13),
    borderRadius: normalizeHeight(10),
    borderWidth: 1,
    borderColor: COLORS.black2,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: normalizeHeight(50),
    backgroundColor: COLORS.black2,
  },
  input: {
    fontSize: normalizeHeight(16),
    color: COLORS.white,
    flex: 1,
    paddingVertical: normalizeHeight(14),
    fontFamily: PoppinsFonts.Poppins_300,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  error: {
    fontSize: normalizeHeight(13),
    color: COLORS.error,
    fontFamily: PoppinsFonts.Poppins_300,
  },
});
