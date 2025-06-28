// SEO Configuration and Analytics Setup
// This file contains all SEO-related configurations and tracking setup

// Google Analytics 4 Configuration
const GA4_CONFIG = {
    measurementId: 'G-XXXXXXXXXX', // Replace with your actual GA4 Measurement ID
    config: {
        page_title: document.title,
        page_location: window.location.href,
        content_group1: 'Engineering Portfolio',
        content_group2: 'Aerospace & Drone Services',
        custom_map: {
            'custom_parameter_1': 'location',
            'custom_parameter_2': 'service_type',
            'custom_parameter_3': 'user_engagement'
        }
    }
};

// Google Search Console Configuration
const GSC_CONFIG = {
    verificationCode: 'YOUR_VERIFICATION_CODE_HERE', // Replace with your GSC verification code
    siteUrl: 'https://aeronautyy.com'
};

// Bing Webmaster Tools Configuration
const BING_CONFIG = {
    verificationCode: 'YOUR_BING_VERIFICATION_CODE', // Replace with your Bing verification code
};

// SEO Tracking Events
const SEO_EVENTS = {
    // Track contact form submissions
    contactFormSubmit: () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form_submit', {
                event_category: 'engagement',
                event_label: 'contact_form',
                value: 1
            });
        }
    },

    // Track resume downloads
    resumeDownload: () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'file_download', {
                event_category: 'engagement',
                event_label: 'resume_pdf',
                file_name: 'Adeel Resume.pdf',
                value: 1
            });
        }
    },

    // Track drone services page views
    droneServicesView: () => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                event_category: 'services',
                event_label: 'drone_services',
                page_title: 'Drone Services Portfolio',
                value: 1
            });
        }
    },

    // Track external link clicks
    externalLinkClick: (url, linkText) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'external_link',
                event_label: linkText,
                link_url: url,
                value: 1
            });
        }
    },

    // Track social media clicks
    socialMediaClick: (platform) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'social_click', {
                event_category: 'social_media',
                event_label: platform,
                value: 1
            });
        }
    },

    // Track scroll depth
    scrollDepth: (percentage) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `scroll_${percentage}`,
                value: percentage
            });
        }
    }
};

// Schema.org Structured Data Templates
const SCHEMA_TEMPLATES = {
    // Person schema for main page
    person: {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Adeel Ahsan",
        "jobTitle": "Aerospace Engineer & Control Systems Specialist",
        "url": "https://aeronautyy.com",
        "image": "https://aeronautyy.com/assets/adeel2.jpg",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "St. John's",
            "addressRegion": "NL",
            "addressCountry": "CA"
        },
        "email": "maahsan@mun.ca",
        "telephone": "+1-709-219-7411"
    },

    // Local Business schema for drone services
    localBusiness: {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Adeel Ahsan - Professional Drone Services",
        "description": "Professional drone services in St. John's, Newfoundland",
        "url": "https://aeronautyy.com/drone-portfolio.html",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "St. John's",
            "addressRegion": "NL",
            "addressCountry": "CA"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 47.5615,
            "longitude": -52.7126
        },
        "telephone": "+1-709-219-7411",
        "email": "maahsan@mun.ca"
    }
};

// SEO Meta Tags Configuration
const META_CONFIG = {
    defaultTitle: "Adeel Ahsan - Aerospace Engineer & Control Systems Specialist",
    titleTemplate: "%s | Adeel Ahsan",
    defaultDescription: "Aerospace Engineer and certified drone pilot specializing in UAV control systems, trajectory optimization, and professional drone services in St. John's, Newfoundland.",
    siteUrl: "https://aeronautyy.com",
    defaultImage: "https://aeronautyy.com/assets/adeel2.jpg",
    twitterHandle: "@aeronautyy",
    facebookAppId: "", // Add if you have a Facebook App ID
    
    // Keywords for different pages
    keywords: {
        home: "Aerospace Engineer Canada, Control Systems St Johns, UAV Newfoundland, Drone Services St Johns, Model Predictive Control, Neural Networks, Robotics",
        droneServices: "Drone Services St Johns, Aerial Photography Newfoundland, SFOC Licensed Drone Operator, Infrastructure Inspection Drones, FPV Videography",
        pidTuner: "PID Controller Tuning, Control Systems Design, MATLAB Simulink, Engineering Tools, Aerospace Control"
    }
};

// Performance and Core Web Vitals Tracking
const PERFORMANCE_CONFIG = {
    // Track Core Web Vitals
    trackCoreWebVitals: () => {
        if ('web-vitals' in window) {
            const { getCLS, getFID, getFCP, getLCP, getTTFB } = window.webVitals;
            
            getCLS((metric) => {
                gtag('event', 'web_vitals', {
                    event_category: 'performance',
                    event_label: 'CLS',
                    value: Math.round(metric.value * 1000),
                    non_interaction: true
                });
            });

            getFID((metric) => {
                gtag('event', 'web_vitals', {
                    event_category: 'performance',
                    event_label: 'FID',
                    value: Math.round(metric.value),
                    non_interaction: true
                });
            });

            getFCP((metric) => {
                gtag('event', 'web_vitals', {
                    event_category: 'performance',
                    event_label: 'FCP',
                    value: Math.round(metric.value),
                    non_interaction: true
                });
            });

            getLCP((metric) => {
                gtag('event', 'web_vitals', {
                    event_category: 'performance',
                    event_label: 'LCP',
                    value: Math.round(metric.value),
                    non_interaction: true
                });
            });

            getTTFB((metric) => {
                gtag('event', 'web_vitals', {
                    event_category: 'performance',
                    event_label: 'TTFB',
                    value: Math.round(metric.value),
                    non_interaction: true
                });
            });
        }
    }
};

// Initialize SEO tracking
const initializeSEO = () => {
    // Set up event listeners for tracking
    document.addEventListener('DOMContentLoaded', () => {
        // Track resume download clicks
        const resumeLinks = document.querySelectorAll('a[href*="Resume.pdf"]');
        resumeLinks.forEach(link => {
            link.addEventListener('click', SEO_EVENTS.resumeDownload);
        });

        // Track external links
        const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="aeronautyy.com"])');
        externalLinks.forEach(link => {
            link.addEventListener('click', () => {
                SEO_EVENTS.externalLinkClick(link.href, link.textContent);
            });
        });

        // Track social media links
        const socialLinks = {
            'linkedin.com': 'LinkedIn',
            'github.com': 'GitHub',
            'instagram.com': 'Instagram',
            'youtube.com': 'YouTube',
            'spotify.com': 'Spotify'
        };

        Object.keys(socialLinks).forEach(domain => {
            const links = document.querySelectorAll(`a[href*="${domain}"]`);
            links.forEach(link => {
                link.addEventListener('click', () => {
                    SEO_EVENTS.socialMediaClick(socialLinks[domain]);
                });
            });
        });

        // Track scroll depth
        let scrollDepthTracked = [];
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            const milestones = [25, 50, 75, 90];
            
            milestones.forEach(milestone => {
                if (scrollPercent >= milestone && !scrollDepthTracked.includes(milestone)) {
                    scrollDepthTracked.push(milestone);
                    SEO_EVENTS.scrollDepth(milestone);
                }
            });
        });
    });

    // Track Core Web Vitals if available
    if (typeof gtag !== 'undefined') {
        PERFORMANCE_CONFIG.trackCoreWebVitals();
    }
};

// Export configuration for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        GA4_CONFIG,
        GSC_CONFIG,
        BING_CONFIG,
        SEO_EVENTS,
        SCHEMA_TEMPLATES,
        META_CONFIG,
        PERFORMANCE_CONFIG,
        initializeSEO
    };
}

// Auto-initialize if in browser environment
if (typeof window !== 'undefined') {
    initializeSEO();
}
