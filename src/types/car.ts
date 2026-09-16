export interface Car {
  variant_id: number;
  generation_id: number;
  display_name: string;
  power_hp: number | null;
  battery_kwh: number | null;
  top_speed_kmh: number | null;
  torque_nm: number | null;
  accel_0_100_s: number | null;
  fuel_slug: string | null;
  body_type_en: string | null;
  price_new_eur: number | null;
  spec_count: number;
}

export interface SpecValue {
  v?: string | number | boolean;
  u?: string;
  c?: number;
}

export interface CarDetail extends Car {
  specs?: Record<string, SpecValue>;
}

export interface CarImage {
  url: string;
  variant: 'card' | 'hero';
}