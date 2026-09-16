import React, { useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Theme } from '@/theme';

interface AuthInputProps {
  label: string;
  icon: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  showTogglePassword?: boolean;
  isPasswordVisible?: boolean;
  onTogglePassword?: () => void;
}

export function AuthInput({
  label,
  icon,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  showTogglePassword = false,
  isPasswordVisible = false,
  onTogglePassword,
}: AuthInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
        ]}
      >
        <Text style={styles.inputIcon}>{icon}</Text>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          placeholderTextColor={Theme.colors.textDisabled}
          style={[styles.input, showTogglePassword && styles.inputWithToggle]}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          selectionColor={Theme.colors.accentLight}
        />
        {showTogglePassword && onTogglePassword ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={onTogglePassword}
            activeOpacity={0.7}
            hitSlop={styles.hitSlopArea}
          >
            <Text style={styles.eyeText}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceInput,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 52,
  },
  inputContainerFocused: {
    borderColor: Theme.colors.accentLight,
    shadowColor: Theme.colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  inputIcon: {
    fontSize: 15,
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: Theme.colors.textPrimary,
    fontWeight: '500',
  },
  inputWithToggle: {
    paddingRight: 8,
  },
  eyeButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  eyeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.accentLight,
  },
  hitSlopArea: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
