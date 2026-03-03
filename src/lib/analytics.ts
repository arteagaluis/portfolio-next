/**
 * Senior Analytics Engineer Implementation
 * Type-safe analytics helper for Next.js App Router
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

// Definición de tipos para eventos profesionales
export type AnalyticsEvent = {
    action: 'project_click' | 'cv_download' | 'contact_click' | 'language_change' | 'scroll_depth' | 'section_engagement';
    category: 'Engagement' | 'Conversion' | 'Navigation';
    label?: string;
    value?: number;
    params?: Record<string, any>;
};

/**
 * Dispara un evento personalizado a GA4
 */
export const trackEvent = ({ action, category, label, value, params }: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
        (window as any).gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
            ...params,
        });

        // Debug en desarrollo
        if (process.env.NODE_ENV === 'development') {
            console.log(`[GA4 Event] ${action}:`, { category, label, value, ...params });
        }
    }
};

/**
 * Tracking de vista de página para SPA (Next.js App Router)
 */
export const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag && GA_MEASUREMENT_ID) {
        (window as any).gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};
