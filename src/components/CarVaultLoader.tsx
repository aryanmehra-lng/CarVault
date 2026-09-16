import { Image, ImageStyle } from 'expo-image';
import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

export interface CarVaultLoaderProps {
  /**
   * Optional message displayed beneath the car animation.
   * Defaults to "Loading CarVault garage...".
   * Pass null or empty string to hide.
   */
  message?: string | null;

  /**
   * Base width for the loader image. Defaults to 220.
   */
  size?: number;

  /**
   * Explicit width override.
   */
  width?: number;

  /**
   * Explicit height override. Defaults to (width * 3) / 4 (4:3 aspect ratio).
   */
  height?: number;

  /**
   * Container style override.
   */
  style?: StyleProp<ViewStyle>;

  /**
   * Image style override.
   */
  imageStyle?: StyleProp<ImageStyle>;

  /**
   * Text style override.
   */
  textStyle?: StyleProp<TextStyle>;

  /**
   * Test ID for testing.
   */
  testID?: string;
}

// Exactly the GIF requested from: https://www.renser.com.tr/tema/demos/car/images/page-loader.gif
const PAGE_LOADER_GIF = require('../../assets/animations/page-loader.gif');

export default function CarVaultLoader({
  message = 'Loading CarVault garage...',
  size = 220,
  width,
  height,
  style,
  imageStyle,
  textStyle,
  testID = 'car-vault-loader',
}: CarVaultLoaderProps) {
  const isSmall = (width ?? size) <= 80;
  const dimensionStyle = isSmall ? styles.imageSmall : styles.imageDefault;

  return (
    <View
      style={[styles.container, style]}
      testID={testID}
      accessibilityRole="progressbar"
      accessibilityLabel={message ?? 'Loading animation'}
    >
      <Image
        source={PAGE_LOADER_GIF}
        style={[dimensionStyle, imageStyle]}
        contentFit="contain"
        autoplay
        priority="high"
        cachePolicy="memory-disk"
      />
      {Boolean(message) && (
        <Text style={[styles.message, textStyle]}>{message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 24,
  },
  imageDefault: {
    width: 220,
    height: 165,
    alignSelf: 'center',
  },
  imageSmall: {
    width: 76,
    height: 48,
    alignSelf: 'center',
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
