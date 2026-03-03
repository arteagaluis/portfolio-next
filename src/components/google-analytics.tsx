'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Script from 'next/script';
import { GA_MEASUREMENT_ID, trackPageView } from '@/lib/analytics';

function GoogleAnalyticsTracker() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname) return;

        const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
        trackPageView(url);
    }, [pathname, searchParams]);

    return null;
}

export default function GoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) {
        if (process.env.NODE_ENV === 'development') {
            console.warn('Google Analytics ID (NEXT_PUBLIC_GA_ID) not found. Tracking disabled.');
        }
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              send_page_view: false // Manual pageview tracking logic handles this
            });
          `,
                }}
            />
            <Suspense fallback={null}>
                <GoogleAnalyticsTracker />
            </Suspense>
        </>
    );
}
