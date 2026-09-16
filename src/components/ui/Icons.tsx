import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface IconProps {
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
}

interface HeartIconProps extends IconProps {
  filled?: boolean;
}

const colorStylesCache: Record<
  string,
  {
    border: ViewStyle;
    borderBottom: ViewStyle;
    bg: ViewStyle;
  }
> = {};

function getIconColorStyles(color: string) {
  if (!colorStylesCache[color]) {
    colorStylesCache[color] = StyleSheet.create({
      border: { borderColor: color },
      borderBottom: { borderBottomColor: color },
      bg: { backgroundColor: color },
    });
  }
  return colorStylesCache[color];
}

export function HomeIcon({ color = '#FFFFFF', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.homeContainer, style]}>
      <View style={[styles.homeRoof, c.borderBottom]} />
      <View style={[styles.homeBase, c.bg]}>
        <View style={styles.homeDoor} />
      </View>
    </View>
  );
}

export function SearchIcon({ color = '#FFFFFF', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.searchContainer, style]}>
      <View style={[styles.searchCircle, c.border]} />
      <View style={[styles.searchHandle, c.bg]} />
    </View>
  );
}

export function HeartIcon({ color = '#EF4444', filled = false, style }: HeartIconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.heartContainer, style]}>
      <View style={styles.heartInner}>
        <View
          style={[
            styles.heartLobeLeft,
            filled ? styles.heartFilledLobe : styles.heartOutlinedLobe,
            filled ? c.bg : c.border,
          ]}
        />
        <View
          style={[
            styles.heartLobeRight,
            filled ? styles.heartFilledLobe : styles.heartOutlinedLobe,
            filled ? c.bg : c.border,
          ]}
        />
      </View>
    </View>
  );
}

export function ProfileIcon({ color = '#FFFFFF', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.profileContainer, style]}>
      <View style={[styles.profileHead, c.border]} />
      <View style={[styles.profileShoulders, c.border]} />
    </View>
  );
}

export function BackIcon({ color = '#FFFFFF', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.backContainer, style]}>
      <View style={[styles.backArrow, c.border]} />
    </View>
  );
}

export function CloseIcon({ color = '#94A3B8', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.closeContainer, style]}>
      <View style={[styles.closeDiagonal1, c.bg]} />
      <View style={[styles.closeDiagonal2, c.bg]} />
    </View>
  );
}

export function CheckIcon({ color = '#FFFFFF', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.checkContainer, style]}>
      <View style={[styles.checkMark, c.border]} />
    </View>
  );
}

export function SpeedIcon({ color = '#3B82F6', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.speedContainer, style]}>
      <View style={[styles.speedDial, c.border]}>
        <View style={[styles.speedNeedle, c.bg]} />
      </View>
    </View>
  );
}

export function MailIcon({ color = '#94A3B8', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.mailContainer, style]}>
      <View style={[styles.mailRect, c.border]}>
        <View style={[styles.mailVee, c.border]} />
      </View>
    </View>
  );
}

export function LockIcon({ color = '#94A3B8', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.lockContainer, style]}>
      <View style={[styles.lockShackle, c.border]} />
      <View style={[styles.lockBody, c.bg]}>
        <View style={styles.lockKeyhole} />
      </View>
    </View>
  );
}

export function EyeIcon({ color = '#94A3B8', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.eyeContainer, style]}>
      <View style={[styles.eyeOutline, c.border]}>
        <View style={[styles.eyeIris, c.bg]} />
      </View>
    </View>
  );
}

export function EyeSlashIcon({ color = '#94A3B8', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.eyeContainer, style]}>
      <View style={[styles.eyeOutline, c.border]}>
        <View style={[styles.eyeIris, c.bg]} />
      </View>
      <View style={[styles.eyeSlashBar, c.bg]} />
    </View>
  );
}

export function ShieldIcon({ color = '#3B82F6', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.shieldContainer, style]}>
      <View style={[styles.shieldOuter, c.border]}>
        <View style={[styles.shieldDot, c.bg]} />
      </View>
    </View>
  );
}

export function SparkleIcon({ color = '#3B82F6', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.sparkleContainer, style]}>
      <View style={[styles.sparkleDiamond, c.bg]} />
    </View>
  );
}

export function ArrowRightIcon({ color = '#FFFFFF', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.arrowContainer, style]}>
      <View style={[styles.arrowLine, c.bg]} />
      <View style={[styles.arrowHead, c.border]} />
    </View>
  );
}

export function TagIcon({ color = '#94A3B8', style }: IconProps) {
  const c = getIconColorStyles(color);
  return (
    <View style={[styles.tagContainer, style]}>
      <View style={[styles.tagShape, c.border]}>
        <View style={[styles.tagHole, c.bg]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // Home
  homeContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeRoof: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderRightWidth: 9,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  homeBase: {
    width: 14,
    height: 10,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
    marginTop: -1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  homeDoor: {
    width: 5,
    height: 6,
    backgroundColor: '#090A0F',
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2,
  },

  // Search
  searchContainer: {
    width: 22,
    height: 22,
    position: 'relative',
  },
  searchCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    position: 'absolute',
    top: 2,
    left: 2,
  },
  searchHandle: {
    position: 'absolute',
    width: 2.2,
    height: 8,
    borderRadius: 1,
    bottom: 2,
    right: 4,
    transform: [{ rotate: '-45deg' }],
  },

  // Heart
  heartContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartInner: {
    width: 17,
    height: 17,
    position: 'relative',
  },
  heartLobeLeft: {
    position: 'absolute',
    width: 10,
    height: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    left: 1,
    top: 0,
    transform: [{ rotate: '-45deg' }],
  },
  heartLobeRight: {
    position: 'absolute',
    width: 10,
    height: 15,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    right: 1,
    top: 0,
    transform: [{ rotate: '45deg' }],
  },
  heartFilledLobe: {
    borderWidth: 0,
  },
  heartOutlinedLobe: {
    backgroundColor: 'transparent',
    borderWidth: 1.8,
  },

  // Profile
  profileContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileHead: {
    width: 9,
    height: 9,
    borderRadius: 4.5,
    borderWidth: 2,
    marginBottom: 2,
  },
  profileShoulders: {
    width: 16,
    height: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderWidth: 2,
    borderBottomWidth: 0,
  },

  // Back
  backContainer: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backArrow: {
    width: 10,
    height: 10,
    borderLeftWidth: 2.5,
    borderBottomWidth: 2.5,
    transform: [{ rotate: '45deg' }],
    marginLeft: 3,
  },

  // Close
  closeContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeDiagonal1: {
    position: 'absolute',
    width: 14,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '45deg' }],
  },
  closeDiagonal2: {
    position: 'absolute',
    width: 14,
    height: 2,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },

  // Check
  checkContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    width: 6,
    height: 11,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    transform: [{ rotate: '45deg' }],
    marginTop: -2,
  },

  // Speed
  speedContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedDial: {
    width: 18,
    height: 10,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
    borderWidth: 2,
    borderBottomWidth: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  speedNeedle: {
    width: 2,
    height: 7,
    transform: [{ rotate: '30deg' }],
  },

  // Mail
  mailContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mailRect: {
    width: 17,
    height: 12,
    borderRadius: 2,
    borderWidth: 1.8,
    position: 'relative',
    overflow: 'hidden',
  },
  mailVee: {
    position: 'absolute',
    top: -4,
    left: 2,
    width: 9,
    height: 9,
    borderBottomWidth: 1.8,
    borderRightWidth: 1.8,
    transform: [{ rotate: '45deg' }],
  },

  // Lock
  lockContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockShackle: {
    width: 10,
    height: 7,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderWidth: 1.8,
    borderBottomWidth: 0,
    marginBottom: -1,
  },
  lockBody: {
    width: 15,
    height: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockKeyhole: {
    width: 2.5,
    height: 4,
    borderRadius: 1,
    backgroundColor: '#090A0F',
  },

  // Eye
  eyeContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  eyeOutline: {
    width: 17,
    height: 11,
    borderRadius: 6,
    borderWidth: 1.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyeIris: {
    width: 4.5,
    height: 4.5,
    borderRadius: 2.25,
  },
  eyeSlashBar: {
    position: 'absolute',
    width: 19,
    height: 1.8,
    borderRadius: 1,
    transform: [{ rotate: '-45deg' }],
  },

  // Shield
  shieldContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldOuter: {
    width: 15,
    height: 16,
    borderWidth: 1.8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shieldDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },

  // Sparkle
  sparkleContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sparkleDiamond: {
    width: 8,
    height: 8,
    borderRadius: 1.5,
    transform: [{ rotate: '45deg' }],
  },

  // Arrow Right
  arrowContainer: {
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  arrowLine: {
    width: 10,
    height: 2,
    borderRadius: 1,
    position: 'absolute',
    left: 2,
  },
  arrowHead: {
    width: 6,
    height: 6,
    borderTopWidth: 2,
    borderRightWidth: 2,
    position: 'absolute',
    right: 3,
    transform: [{ rotate: '45deg' }],
  },

  // Tag
  tagContainer: {
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tagShape: {
    width: 8,
    height: 11,
    borderWidth: 1.4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 1.5,
    borderBottomRightRadius: 1.5,
    alignItems: 'center',
    paddingTop: 1.5,
    transform: [{ rotate: '-45deg' }],
  },
  tagHole: {
    width: 2.2,
    height: 2.2,
    borderRadius: 1.1,
  },
});
