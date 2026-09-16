import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  ArrowRightIcon,
  BackIcon,
  EyeIcon,
  EyeSlashIcon,
  LockIcon,
  MailIcon,
  ProfileIcon,
  ShieldIcon,
  SparkleIcon,
} from '@/components/ui/Icons';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { useSignupForm } from '@/features/auth/hooks/useSignupForm';
import { Theme } from '@/theme';

export default function SignupScreen() {
  const [focusedField, setFocusedField] = useState<
    'name' | 'email' | 'password' | null
  >(null);

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
    error,
    isSubmitting,
    handleSignup,
    handleDemoFill,
    navigateToLogin,
  } = useSignupForm();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/login');
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Ambient Lighting Background Accents */}
          <View pointerEvents="none" style={styles.ambientGlowTop} />
          <View pointerEvents="none" style={styles.ambientGlowAccent} />

          {/* Top Bar Navigation */}
          <View style={styles.topBar}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleBack}
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Go back"
            >
              <BackIcon color="#FFFFFF" />
            </TouchableOpacity>

            <View style={styles.brandBadge}>
              <View style={styles.badgePulseDot} />
              <Text style={styles.brandBadgeText}>COLLECTOR ENROLLMENT</Text>
            </View>

            <View style={styles.topBarSpacer} />
          </View>

          {/* Hero Branding Section */}
          <View style={styles.heroSection}>
            <Text style={styles.heroGreeting}>Join the Fleet,</Text>
            <Text style={styles.heroTitle}>Become a Collector.</Text>
            <Text style={styles.heroSubtitle}>
              Create your verified driver pass to curate your dream garage, benchmark vehicle telemetry, and track rare machinery.
            </Text>

            {/* Feature Highlights Strip */}
            <View style={styles.featureStrip}>
              <View style={styles.featureTag}>
                <Text style={styles.featureTagText}>🏎️ VIP SHOWROOM</Text>
              </View>
              <View style={styles.featureTag}>
                <Text style={styles.featureTagText}>⚡ TELEMETRY BENCHMARK</Text>
              </View>
              <View style={styles.featureTag}>
                <Text style={styles.featureTagText}>🔒 PRIVATE GARAGE</Text>
              </View>
            </View>
          </View>

          {/* Form Card */}
          <View style={styles.formCard}>
            <View style={styles.cardHeaderGlow} />

            {Boolean(error) && (
              <View style={styles.errorBox}>
                <View style={styles.errorDot} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {/* Full Name Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>FULL NAME / ALIAS</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'name' && styles.inputContainerFocused,
                  Boolean(error) && !name.trim() && styles.inputContainerError,
                ]}
              >
                <View style={styles.iconSlot}>
                  <ProfileIcon
                    color={
                      focusedField === 'name'
                        ? Theme.colors.accentLight
                        : Theme.colors.textMuted
                    }
                  />
                </View>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="e.g. Enzo Ferrari"
                  placeholderTextColor={Theme.colors.textDisabled}
                  style={styles.textInput}
                  autoCapitalize="words"
                  selectionColor={Theme.colors.accentLight}
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>EMAIL ADDRESS</Text>
              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'email' && styles.inputContainerFocused,
                  Boolean(error) && !email.includes('@') && styles.inputContainerError,
                ]}
              >
                <View style={styles.iconSlot}>
                  <MailIcon
                    color={
                      focusedField === 'email'
                        ? Theme.colors.accentLight
                        : Theme.colors.textMuted
                    }
                  />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="driver@carvault.io"
                  placeholderTextColor={Theme.colors.textDisabled}
                  style={styles.textInput}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  selectionColor={Theme.colors.accentLight}
                />
              </View>
            </View>

            {/* Password Field */}
            <View style={styles.inputGroup}>
              <View style={styles.passwordLabelRow}>
                <Text style={styles.inputLabel}>PASSWORD KEY</Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={toggleShowPassword}
                  hitSlop={styles.hitSlopArea}
                >
                  <Text style={styles.showPasswordText}>
                    {showPassword ? 'Hide Key' : 'Reveal Key'}
                  </Text>
                </TouchableOpacity>
              </View>

              <View
                style={[
                  styles.inputContainer,
                  focusedField === 'password' && styles.inputContainerFocused,
                  Boolean(error) && password.length < 4 && styles.inputContainerError,
                ]}
              >
                <View style={styles.iconSlot}>
                  <LockIcon
                    color={
                      focusedField === 'password'
                        ? Theme.colors.accentLight
                        : Theme.colors.textMuted
                    }
                  />
                </View>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="At least 4 characters"
                  placeholderTextColor={Theme.colors.textDisabled}
                  style={styles.textInput}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  selectionColor={Theme.colors.accentLight}
                />
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={toggleShowPassword}
                  style={styles.eyeButton}
                  hitSlop={styles.hitSlopArea}
                  accessibilityLabel="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeSlashIcon color={Theme.colors.accentLight} />
                  ) : (
                    <EyeIcon color={Theme.colors.textMuted} />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            {/* Submit Action */}
            <View style={styles.buttonWrapper}>
              <PrimaryButton
                title="Create Collector Pass"
                onPress={handleSignup}
                loading={isSubmitting}
                size="lg"
                icon={<ArrowRightIcon color="#FFFFFF" />}
              />
            </View>

            {/* Quick Demo Credentials Card */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleDemoFill}
              style={styles.demoCard}
              accessibilityRole="button"
              accessibilityLabel="Autofill demo collector profile"
            >
              <View style={styles.demoCardLeft}>
                <View style={styles.demoIconBadge}>
                  <SparkleIcon color={Theme.colors.accentLight} />
                </View>
                <View>
                  <Text style={styles.demoCardTitle}>Instant Collector Pass</Text>
                  <Text style={styles.demoCardSubtitle}>Dominic Toretto (VIP)</Text>
                </View>
              </View>
              <View style={styles.demoCardActionBadge}>
                <Text style={styles.demoCardActionText}>Autofill ⚡</Text>
              </View>
            </TouchableOpacity>

            {/* Security Assurance Badge */}
            <View style={styles.securityRow}>
              <ShieldIcon color={Theme.colors.accentLight} />
              <Text style={styles.securityText}>
                256-bit encrypted isolated profile storage
              </Text>
            </View>
          </View>

          {/* Footer Switcher */}
          <View style={styles.footerRow}>
            <Text style={styles.footerText}>Already registered? </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={navigateToLogin}
              hitSlop={styles.hitSlopArea}
            >
              <Text style={styles.signInLink}>Sign In to Vault</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
    justifyContent: 'center',
    position: 'relative',
  },

  // Ambient Lighting
  ambientGlowTop: {
    position: 'absolute',
    top: -80,
    alignSelf: 'center',
    width: 320,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(37, 99, 235, 0.14)',
  },
  ambientGlowAccent: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    width: 180,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(59, 130, 246, 0.08)',
  },

  // Top Bar Navigation
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Theme.radius.full,
    backgroundColor: Theme.colors.accentMuted,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.4)',
  },
  badgePulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Theme.colors.accentLight,
  },
  brandBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: Theme.colors.accentLight,
    letterSpacing: 1.2,
  },
  topBarSpacer: {
    width: 42,
    height: 42,
  },

  // Hero Section
  heroSection: {
    marginBottom: 24,
  },
  heroGreeting: {
    fontSize: 24,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    letterSpacing: -0.4,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.6,
    lineHeight: 40,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    color: Theme.colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },

  // Feature Strip
  featureStrip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  featureTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  featureTagText: {
    fontSize: 10,
    fontWeight: '700',
    color: Theme.colors.textMuted,
    letterSpacing: 0.6,
  },

  // Form Card
  formCard: {
    backgroundColor: Theme.colors.surface,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.45,
    shadowRadius: 20,
    elevation: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  cardHeaderGlow: {
    position: 'absolute',
    top: 0,
    left: 40,
    right: 40,
    height: 2,
    backgroundColor: Theme.colors.accent,
    opacity: 0.8,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.35)',
    padding: 12,
    marginBottom: 16,
    gap: 8,
  },
  errorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#EF4444',
  },
  errorText: {
    flex: 1,
    fontSize: 13,
    color: '#FCA5A5',
    fontWeight: '600',
  },

  // Input Groups
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.textSecondary,
    marginBottom: 8,
    letterSpacing: 0.8,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  showPasswordText: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.accentLight,
    letterSpacing: 0.4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.surfaceInput,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Theme.colors.border,
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
  inputContainerError: {
    borderColor: '#EF4444',
  },
  iconSlot: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '500',
    color: Theme.colors.textPrimary,
    height: '100%',
  },
  eyeButton: {
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Submit Button
  buttonWrapper: {
    marginTop: 6,
    marginBottom: 10,
  },

  // Demo Card
  demoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  demoCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  demoIconBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Theme.colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  demoCardTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  demoCardSubtitle: {
    fontSize: 11,
    color: Theme.colors.textMuted,
    fontWeight: '500',
  },
  demoCardActionBadge: {
    backgroundColor: Theme.colors.accentMuted,
    borderWidth: 1,
    borderColor: 'rgba(37, 99, 235, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  demoCardActionText: {
    fontSize: 11,
    fontWeight: '700',
    color: Theme.colors.accentLight,
  },

  // Security Row
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingTop: 4,
  },
  securityText: {
    fontSize: 11,
    fontWeight: '600',
    color: Theme.colors.textMuted,
    letterSpacing: 0.3,
  },

  // Footer Row
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
  },
  signInLink: {
    fontSize: 13,
    fontWeight: '700',
    color: Theme.colors.accentLight,
  },

  // Hit slop helper
  hitSlopArea: {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10,
  },
});
