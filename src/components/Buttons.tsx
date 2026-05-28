import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from 'react-native';
import {colors, shadow} from '../theme';

type ButtonProps = {
  title: string;
  emoji?: string;
  onPress: () => void;
  variant?: 'primary' | 'ghost' | 'cyan' | 'purple';
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  emoji,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({pressed}) => [
        styles.button,
        styles[variant],
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}>
      <Text style={[styles.text, variant === 'ghost' && styles.ghostText]}>
        {emoji ? `${emoji}  ` : ''}
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 54,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.blue,
    borderColor: '#4f91ff',
    ...shadow,
  },
  cyan: {
    backgroundColor: '#083c47',
    borderColor: colors.cyan,
  },
  purple: {
    backgroundColor: colors.violet,
    borderColor: '#b27cff',
  },
  ghost: {
    backgroundColor: colors.panel,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.45,
  },
  pressed: {
    transform: [{scale: 0.98}],
  },
  text: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  ghostText: {
    color: '#9fc0ff',
  },
});
