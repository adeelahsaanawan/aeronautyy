/**
 * Payment Handler for Mathematical Wallpapers
 * Handles Stripe payment success and download functionality
 */

class PaymentHandler {
    constructor() {
        this.paymentVerified = false;
        this.selectedWallpaper = null;
        this.init();
    }

    init() {
        // Check for payment success in URL parameters
        this.checkPaymentSuccess();
        
        // Listen for Stripe events
        this.setupStripeListeners();
        
        // Setup download buttons
        this.setupDownloadButtons();

        // Setup wallpaper selection tracking
        this.setupWallpaperTracking();
    }

    checkPaymentSuccess() {
        const urlParams = new URLSearchParams(window.location.search);
        const paymentSuccess = urlParams.get('payment_success');
        const sessionId = urlParams.get('session_id');

        // Check for Stripe success parameters
        if (paymentSuccess === 'true' || sessionId) {
            this.handlePaymentSuccess(sessionId || 'stripe_success');
        }

        // Check for Stripe's default success redirect
        if (window.location.href.includes('success') || window.location.href.includes('checkout-success')) {
            this.handlePaymentSuccess('stripe_checkout_success');
        }

        // Also check localStorage for previous successful payments
        const storedPayment = localStorage.getItem('wallpaper_payment_verified');
        if (storedPayment) {
            this.paymentVerified = true;
            this.enableDownloads();
        }
    }

    setupStripeListeners() {
        // Listen for Stripe checkout completion
        window.addEventListener('message', (event) => {
            console.log('Received message:', event.data);

            if (event.data.type === 'stripe_checkout_success') {
                this.handlePaymentSuccess(event.data.sessionId);
            } else if (event.data.type === 'stripe_checkout_error') {
                this.handlePaymentError(event.data.error);
            }
        });

        // Listen for Stripe Buy Button events
        document.addEventListener('stripe-buy-button-click', (event) => {
            console.log('Stripe button clicked:', event.detail);
            const button = event.target;
            const container = button.closest('.stripe-buy-button-container');
            if (container) {
                container.classList.add('loading');
            }
        });

        // Listen for Stripe checkout events
        document.addEventListener('stripe-checkout-success', (event) => {
            console.log('Stripe checkout success:', event.detail);
            this.handlePaymentSuccess(event.detail.sessionId);
        });

        document.addEventListener('stripe-checkout-error', (event) => {
            console.log('Stripe checkout error:', event.detail);
            this.handlePaymentError(event.detail.error);
        });
    }

    setupWallpaperTracking() {
        // Check if there's a selected wallpaper from localStorage
        const storedWallpaper = localStorage.getItem('selected_wallpaper');
        if (storedWallpaper) {
            try {
                this.selectedWallpaper = JSON.parse(storedWallpaper);
            } catch (e) {
                console.error('Error parsing stored wallpaper:', e);
                localStorage.removeItem('selected_wallpaper');
            }
        }

        // Set up click tracking for Stripe buttons
        document.addEventListener('click', (e) => {
            // Check if clicked element is a Stripe buy button or its parent
            const stripeButton = e.target.closest('stripe-buy-button');
            if (stripeButton) {
                const filename = stripeButton.getAttribute('data-wallpaper-filename');
                const name = stripeButton.getAttribute('data-wallpaper-name');

                if (filename && name) {
                    this.selectedWallpaper = { filename, name };

                    // Store in localStorage to persist across page redirects
                    localStorage.setItem('selected_wallpaper', JSON.stringify(this.selectedWallpaper));

                    console.log('✅ Wallpaper selected for purchase:', this.selectedWallpaper);

                    // Show a brief confirmation
                    this.showNotification(`🛒 "${name}" added to cart. Redirecting to payment...`, 'info');
                } else {
                    console.error('❌ Missing wallpaper data attributes on Stripe button');
                }
            }
        });
    }

    handlePaymentSuccess(sessionId) {
        this.paymentVerified = true;

        // Store payment verification
        localStorage.setItem('wallpaper_payment_verified', JSON.stringify({
            sessionId: sessionId,
            timestamp: new Date().toISOString(),
            verified: true
        }));

        // Enable downloads
        this.enableDownloads();

        // Show success message and start automatic download
        this.showPaymentSuccessMessage();
        this.startAutomaticDownload();

        // Clean up URL
        if (window.history.replaceState) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
        }
    }

    handlePaymentError(error) {
        console.error('Payment error:', error);

        // Remove loading states
        const loadingContainers = document.querySelectorAll('.stripe-buy-button-container.loading');
        loadingContainers.forEach(container => {
            container.classList.remove('loading');
        });

        // Show error message
        this.showPaymentErrorMessage(error);

        // Clear any stored payment verification
        localStorage.removeItem('wallpaper_payment_verified');
        localStorage.removeItem('selected_wallpaper');

        this.paymentVerified = false;
    }

    showPaymentErrorMessage(error) {
        const errorBanner = document.createElement('div');
        errorBanner.className = 'fixed top-20 left-0 right-0 z-50 bg-red-500 text-white p-4 text-center';
        errorBanner.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <i class="fas fa-exclamation-triangle mr-2"></i>
                Payment failed: ${error?.message || 'An error occurred during payment processing'}
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-red-200 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(errorBanner);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (errorBanner.parentElement) {
                errorBanner.remove();
            }
        }, 8000);
    }

    enableDownloads() {
        const downloadButtons = document.querySelectorAll('.download-btn');
        downloadButtons.forEach(button => {
            button.classList.remove('opacity-50', 'cursor-not-allowed');
            button.disabled = false;
            
            // Update button text if it was disabled
            if (button.innerHTML.includes('Purchase Required')) {
                button.innerHTML = '<i class="fas fa-download mr-2"></i>Download';
            }
        });
        
        // Show success indicator
        this.showDownloadEnabledIndicator();
    }

    setupDownloadButtons() {
        const downloadButtons = document.querySelectorAll('.download-btn');
        
        downloadButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (!this.paymentVerified) {
                    this.showPaymentRequiredMessage();
                    return;
                }
                
                const filename = button.getAttribute('data-filename');
                const name = button.getAttribute('data-name');
                
                if (filename && name) {
                    this.downloadWallpaper(filename, name);
                }
            });
        });
    }

    downloadWallpaper(filename, name) {
        try {
            // Show download starting notification with specific wallpaper name
            this.showNotification(`🎨 Starting download of "${name}" wallpaper...`, 'info');

            // Create download link
            const link = document.createElement('a');
            link.href = `wallpapers/${filename}`;
            link.download = `${name.replace(/\s+/g, '_')}_by_aeronautyy.png`;
            link.style.display = 'none';

            // Add to DOM, click, and remove
            document.body.appendChild(link);

            // Trigger download
            link.click();

            // Clean up
            setTimeout(() => {
                if (link.parentNode) {
                    document.body.removeChild(link);
                }
            }, 100);

            // Show success notification after a delay with specific wallpaper name
            setTimeout(() => {
                this.showNotification(`✅ "${name}" wallpaper downloaded successfully! Thank you for your purchase.`, 'success');
            }, 500);

            // Track download
            this.trackDownload(filename, name);

        } catch (error) {
            console.error('Download error:', error);
            this.showNotification(`❌ Failed to download "${name}" wallpaper. Please try again or contact support.`, 'error');
        }
    }

    showPaymentSuccessMessage() {
        const wallpaperName = this.selectedWallpaper ? this.selectedWallpaper.name : 'your wallpaper';

        const successBanner = document.createElement('div');
        successBanner.className = 'fixed top-20 left-0 right-0 z-50 bg-green-500 text-white p-4 text-center shadow-lg';
        successBanner.innerHTML = `
            <div class="max-w-4xl mx-auto">
                <i class="fas fa-check-circle mr-2"></i>
                Payment successful! "${wallpaperName}" download will start automatically.
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-green-200 hover:text-white">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(successBanner);

        // Auto-remove after 8 seconds
        setTimeout(() => {
            if (successBanner.parentElement) {
                successBanner.remove();
            }
        }, 8000);
    }

    startAutomaticDownload() {
        // Check if a specific wallpaper was selected
        if (this.selectedWallpaper) {
            // Download only the selected wallpaper
            console.log('Starting download for selected wallpaper:', this.selectedWallpaper);

            setTimeout(() => {
                this.downloadWallpaper(this.selectedWallpaper.filename, this.selectedWallpaper.name);
            }, 1000); // Small delay to ensure payment processing is complete

            // Clear the selection
            this.selectedWallpaper = null;
            localStorage.removeItem('selected_wallpaper');
        } else {
            // No specific wallpaper selected - this shouldn't happen in normal flow
            console.error('No wallpaper selected for download');
            this.showNotification('Error: No wallpaper selected for download. Please try purchasing again.', 'error');
        }
    }

    // Removed downloadAllWallpapers and related functions
    // Payment should only download the specific selected wallpaper

    showDownloadEnabledIndicator() {
        // Add a small indicator to show downloads are enabled
        const indicator = document.createElement('div');
        indicator.className = 'fixed bottom-4 right-4 z-50 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg';
        indicator.innerHTML = '<i class="fas fa-unlock mr-2"></i>Downloads Enabled';
        
        document.body.appendChild(indicator);
        
        setTimeout(() => {
            indicator.remove();
        }, 3000);
    }

    showPaymentRequiredMessage() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
        modal.innerHTML = `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md mx-4">
                <div class="text-center">
                    <i class="fas fa-lock text-4xl text-blue-500 mb-4"></i>
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Purchase Required
                    </h3>
                    <p class="text-gray-600 dark:text-gray-300 mb-6">
                        Please purchase the complete collection to download wallpapers.
                    </p>
                    <div class="flex gap-4 justify-center">
                        <button onclick="this.closest('.fixed').remove()" 
                                class="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
                            Cancel
                        </button>
                        <a href="#purchase" onclick="this.closest('.fixed').remove()" 
                           class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                            Purchase Now
                        </a>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close on background click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-20 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500 text-white' : 
            type === 'error' ? 'bg-red-500 text-white' : 
            'bg-blue-500 text-white'
        }`;
        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'exclamation-triangle' : 'info'} mr-2"></i>
                ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    trackDownload(filename, name) {
        // Track download for analytics (could be enhanced with proper analytics)
        console.log(`Downloaded: ${name} (${filename})`);

        // Store download history
        const downloads = JSON.parse(localStorage.getItem('wallpaper_downloads') || '[]');
        downloads.push({
            filename,
            name,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('wallpaper_downloads', JSON.stringify(downloads));

        // Could send to analytics service
        // gtag('event', 'download', {
        //     'event_category': 'wallpaper',
        //     'event_label': name
        // });
    }



    // Get download history
    getDownloadHistory() {
        return JSON.parse(localStorage.getItem('wallpaper_downloads') || '[]');
    }

    // Clear download history
    clearDownloadHistory() {
        localStorage.removeItem('wallpaper_downloads');
        console.log('Download history cleared');
    }




}

// Initialize payment handler when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.paymentHandler = new PaymentHandler();
    console.log('Payment handler initialized and ready for wallpaper purchases.');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PaymentHandler;
}
