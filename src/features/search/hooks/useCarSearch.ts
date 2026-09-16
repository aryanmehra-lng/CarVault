import Fuse from 'fuse.js';
import { useEffect, useMemo, useState } from 'react';

import { analyticsService } from '@/lib/analytics/analytics.service';
import type { Car } from '@/types/car';

const FUSE_OPTIONS = {
    keys: [
        { name: 'display_name', weight: 0.7 }, // highest priority (e.g. "Ford Granada")
        { name: 'body_type_en', weight: 0.2 }, // e.g. "Sedan", "Coupe"
        { name: 'fuel_slug', weight: 0.1 },    // e.g. "petrol"
    ],
    threshold: 0.35, // Sensitivity: 0.0 is exact match, 1.0 matches anything
    ignoreLocation: true,
};

export function useCarSearch(cars: Car[]) {
    const [searchQuery, setSearchQuery] = useState('');

    // Memoize the Fuse instance so it re-indexes only when the cars array changes
    const fuse = useMemo(() => {
        return new Fuse(cars, FUSE_OPTIONS);
    }, [cars]);

    // Derive the search results
    const searchResults = useMemo(() => {
        const trimmed = searchQuery.trim();
        if (!trimmed) {
            return cars;
        }
        return fuse.search(trimmed).map((result) => result.item);
    }, [fuse, searchQuery, cars]);

    // Debounce tracking search events to avoid spamming on every keystroke
    useEffect(() => {
        const trimmed = searchQuery.trim();
        if (trimmed.length < 2) return;

        const timer = setTimeout(() => {
            analyticsService.trackSearch(trimmed, searchResults.length);
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, searchResults.length]);

    const clearSearch = () => setSearchQuery('');

    return {
        searchQuery,
        setSearchQuery,
        clearSearch,
        searchResults,
    };
}
