import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { CloseIcon, SearchIcon } from '@/components/ui/Icons';
import { Theme } from '@/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
  onFocus?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
}

export function SearchBar({
  value,
  onChangeText,
  onClear,
  onFocus,
  placeholder = '',
  autoFocus = false,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isFocused && styles.containerFocused,
      ]}
    >
      <SearchIcon
        size={18}
        color={isFocused ? Theme.colors.accentLight : Theme.colors.textMuted}
        style={styles.searchIcon}
      />

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Theme.colors.textMuted}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        autoFocus={autoFocus}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => setIsFocused(false)}
        clearButtonMode="never"
        selectionColor={Theme.colors.accentLight}
      />

      {value.length > 0 && (
        <Pressable onPress={onClear} style={styles.clearButton} hitSlop={10}>
          <CloseIcon size={14} color="#FFFFFF" />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceInput,
    borderRadius: Theme.radius.lg,
    paddingHorizontal: 16,
    height: 48,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  containerFocused: {
    borderColor: Theme.colors.accent,
    backgroundColor: Theme.colors.surface,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.textPrimary,
    letterSpacing: -0.2,
  },
  clearButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: Theme.colors.surfaceElevated,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
});
