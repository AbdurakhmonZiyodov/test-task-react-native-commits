import React, { useCallback } from 'react';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import RN from '../RN';
import { useRouter } from 'expo-router';
import { COLORS } from '@/constants/colors';
import { HIT_SLOP } from '@/styles/global';

interface BackButtonProps {
  color?: string;
  onGoBack?: () => void;
}

export default function BackButton({ color, onGoBack }: BackButtonProps) {
  const router = useRouter();

  const onBackHandler = useCallback(() => {
    if (onGoBack) return onGoBack();
    return router.back();
  }, [onGoBack, router]);
  return (
    <RN.TouchableOpacity onPress={onBackHandler} hitSlop={HIT_SLOP}>
      <MaterialIcons
        name={'arrow-back-ios'}
        size={24}
        color={color || COLORS.black}
      />
    </RN.TouchableOpacity>
  );
}
