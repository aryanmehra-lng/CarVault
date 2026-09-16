export const endpoints = {
  brands: '/brands',
  search: '/search',
  variants: '/variants',

  brandModels: (brandSlug: string) =>
    `/brands/${brandSlug}/models`,

  modelGenerations: (modelId: number) =>
    `/models/${modelId}/generations`,

  generationVariants: (generationId: number) =>
    `/generations/${generationId}/variants`,

  variant: (variantId: number) =>
    `/variants/${variantId}`,

  variantSpecs: (variantId: number) =>
    `/variants/${variantId}/specs`,

  variantImages: (variantId: number) =>
    `/variants/${variantId}/images`,
};