import { posthog } from './posthog';
import { Car } from '@/types/car';

export interface UserTraits {
  name?: string;
  email?: string;
  [key: string]: any;
}

class AnalyticsService {
  /**
   * Identifies the current user in PostHog.
   * Note: NEVER pass passwords or sensitive authentication credentials.
   */
  identify(userId: string, traits?: UserTraits) {
    try {
      posthog.identify(userId, traits);
    } catch (err) {
      console.warn('[AnalyticsService] identify error:', err);
    }
  }

  /**
   * Resets the current user session on logout.
   */
  reset() {
    try {
      posthog.reset();
    } catch (err) {
      console.warn('[AnalyticsService] reset error:', err);
    }
  }

  /**
   * Tracks a custom event.
   */
  track(event: string, properties?: Record<string, any>) {
    try {
      posthog.capture(event, properties);
    } catch (err) {
      console.warn(`[AnalyticsService] track error for event "${event}":`, err);
    }
  }

  /**
   * Tracks screen navigation.
   */
  trackScreen(screenName: string, properties?: Record<string, any>) {
    try {
      posthog.screen(screenName, properties);
    } catch (err) {
      console.warn(`[AnalyticsService] trackScreen error for "${screenName}":`, err);
    }
  }

  // --- Domain-specific helper events ---

  trackUserSignedUp(userId: string, traits: { name: string; email: string }) {
    this.identify(userId, traits);
    this.track('user_signed_up', {
      user_id: userId,
      name: traits.name,
      email: traits.email,
    });
  }

  trackUserLoggedIn(userId: string, traits: { name?: string; email: string }) {
    this.identify(userId, traits);
    this.track('user_logged_in', {
      user_id: userId,
      email: traits.email,
      name: traits.name,
    });
  }

  trackUserLoggedOut() {
    this.track('user_logged_out');
    this.reset();
  }

  trackCarViewed(car: Car) {
    this.track('car_viewed', {
      variant_id: car.variant_id,
      display_name: car.display_name,
      body_type: car.body_type_en,
      fuel_slug: car.fuel_slug,
      power_hp: car.power_hp,
    });
    this.trackCarOpened(car.variant_id, car.display_name);
  }

  trackCarOpened(variantId: number | string, displayName: string) {
    this.track('car_opened', {
      variant_id: variantId,
      car_name: displayName,
    });
  }

  trackCategorySelected(category: string) {
    this.track('category_selected', {
      category,
    });
  }

  trackOnboardingCompleted(name: string, preferredCategory: string) {
    this.track('onboarding_completed', {
      name,
      preferred_category: preferredCategory,
    });
  }

  trackCarSaved(variantId: number | string, displayName: string) {
    this.track('car_saved', {
      variant_id: variantId,
      car_name: displayName,
    });
  }

  trackCarUnsaved(variantId: number | string, displayName: string) {
    this.track('car_unsaved', {
      variant_id: variantId,
      car_name: displayName,
    });
  }

  trackSearch(query: string, resultCount: number) {
    this.track('search_performed', {
      query,
      result_count: resultCount,
    });
  }
}

export const analyticsService = new AnalyticsService();
