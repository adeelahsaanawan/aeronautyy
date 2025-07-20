/**
 * Payment Handler for Mathematical Wallpapers
 * Handles Stripe payment success and download functionality
 */

class PaymentHandler {
    constructor() {
        this.paymentVerified = false;
        this.selectedWallpaper = null;
        this.downloadAttempted = false;
        this.sessionId = null;
        this.paymentTimestamp = null;
        this.init();
    }

    init() {
        // Clean up any old payment verification data
        this.cleanupOldPaymentData();

        // Check for payment success in URL parameters
        this.checkPaymentSuccess();

        // Listen for Stripe events
        this.setupStripeListeners();

        // Setup download buttons
        this.setupDownloadButtons();

        // Setup wallpaper selection tracking
        this.setupWallpaperTracking();
    }

    cleanupOldPaymentData() {
        // Remove any persistent payment verification from previous sessions
        // Each wallpaper purchase should be independent
        localStorage.removeItem('wallpaper_payment_verified');
        localStorage.removeItem('payment_session_used');
        console.log('Cleaned up old payment verification data');
    }

    // Generate secure session token for one-time use
    generateSecureToken() {
        return 'secure_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Validate payment session is legitimate and unused
    validatePaymentSession(sessionId) {
        if (!sessionId) {
            console.error('🔒 Security: No session ID provided');
            return false;
        }

        // Check if this session has already been used
        const usedSessions = JSON.parse(localStorage.getItem('payment_session_used') || '[]');
        if (usedSessions.includes(sessionId)) {
            console.error('🔒 Security: Payment session already used:', sessionId);
            this.showNotification('❌ This payment session has already been used. Please make a new purchase.', 'error');
            return false;
        }

        // Validate session format (basic security check)
        if (sessionId.length < 10) {
            console.error('🔒 Security: Invalid session format');
            return false;
        }

        return true;
    }

    // Mark payment session as used to prevent reuse
    markSessionAsUsed(sessionId) {
        const usedSessions = JSON.parse(localStorage.getItem('payment_session_used') || '[]');
        usedSessions.push(sessionId);

        // Keep only last 50 sessions to prevent localStorage bloat
        if (usedSessions.length > 50) {
            usedSessions.splice(0, usedSessions.length - 50);
        }

        localStorage.setItem('payment_session_used', JSON.stringify(usedSessions));
        console.log('🔒 Security: Session marked as used:', sessionId);
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

        // Note: Each payment is for a specific wallpaper, no persistent payment verification needed
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
                const parsed = JSON.parse(storedWallpaper);

                // Security: Validate stored wallpaper data
                if (this.validateStoredWallpaper(parsed)) {
                    this.selectedWallpaper = parsed;
                    console.log('✅ Valid wallpaper selection restored:', this.selectedWallpaper.name);
                } else {
                    console.error('🔒 Security: Invalid stored wallpaper data');
                    localStorage.removeItem('selected_wallpaper');
                }
            } catch (e) {
                console.error('🔒 Security: Error parsing stored wallpaper:', e);
                localStorage.removeItem('selected_wallpaper');
            }
        }
    }

    validateStoredWallpaper(wallpaper) {
        if (!wallpaper || typeof wallpaper !== 'object') {
            return false;
        }

        // Check required fields
        if (!wallpaper.filename || !wallpaper.name || !wallpaper.selectionTime || !wallpaper.secureToken) {
            console.error('🔒 Security: Missing required wallpaper fields');
            return false;
        }

        // Check data types
        if (typeof wallpaper.filename !== 'string' || typeof wallpaper.name !== 'string') {
            console.error('🔒 Security: Invalid wallpaper data types');
            return false;
        }

        // Security: Check selection age (prevent old selections)
        const maxAge = 30 * 60 * 1000; // 30 minutes
        const currentTime = Date.now();
        if (currentTime - wallpaper.selectionTime > maxAge) {
            console.error('🔒 Security: Wallpaper selection expired');
            return false;
        }

        // Security: Validate filename format
        if (wallpaper.filename.includes('..') || wallpaper.filename.includes('/') || wallpaper.filename.includes('\\')) {
            console.error('🔒 Security: Invalid filename in stored data');
            return false;
        }

        return true;
    }

        // Set up secure click tracking for Stripe buttons
        document.addEventListener('click', (e) => {
            // Check if clicked element is a Stripe buy button or its parent
            const stripeButton = e.target.closest('stripe-buy-button');
            if (stripeButton) {
                const filename = stripeButton.getAttribute('data-wallpaper-filename');
                const name = stripeButton.getAttribute('data-wallpaper-name');

                // Security: Validate wallpaper data
                if (!filename || !name || filename.trim() === '' || name.trim() === '') {
                    console.error('🔒 Security: Invalid wallpaper data attributes');
                    this.showNotification('❌ Invalid wallpaper selection. Please refresh and try again.', 'error');
                    return;
                }

                // Security: Validate filename format (prevent path traversal)
                if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
                    console.error('🔒 Security: Invalid filename format:', filename);
                    this.showNotification('❌ Invalid wallpaper file. Please contact support.', 'error');
                    return;
                }

                // Security: Reset any previous session data
                this.clearSecureSession();
                this.downloadAttempted = false;

                // Create secure wallpaper selection with timestamp
                this.selectedWallpaper = {
                    filename: filename.trim(),
                    name: name.trim(),
                    selectionTime: Date.now(),
                    secureToken: this.generateSecureToken()
                };

                // Store in localStorage to persist across page redirects
                localStorage.setItem('selected_wallpaper', JSON.stringify(this.selectedWallpaper));

                console.log('✅ Secure wallpaper selection created:', {
                    name: this.selectedWallpaper.name,
                    filename: this.selectedWallpaper.filename,
                    token: this.selectedWallpaper.secureToken
                });

                // Show confirmation
                this.showNotification(`🛒 "${name}" selected for purchase. Redirecting to payment...`, 'info');
            }
        });
    }

    handlePaymentSuccess(sessionId) {
        console.log('🔒 Processing payment success for session:', sessionId);

        // Security: Validate payment session
        if (!this.validatePaymentSession(sessionId)) {
            return; // Validation failed, stop processing
        }

        // Security: Check if download already attempted for this session
        if (this.downloadAttempted) {
            console.error('🔒 Security: Download already attempted for this session');
            this.showNotification('❌ Download already completed for this payment session.', 'error');
            return;
        }

        // Security: Validate wallpaper selection exists
        if (!this.selectedWallpaper || !this.selectedWallpaper.filename || !this.selectedWallpaper.name) {
            console.error('🔒 Security: No valid wallpaper selection found');
            this.showNotification('❌ No wallpaper selected. Please try purchasing again.', 'error');
            return;
        }

        // All security checks passed
        this.paymentVerified = true;
        this.sessionId = sessionId;
        this.paymentTimestamp = Date.now();

        console.log('✅ Payment verified for wallpaper:', this.selectedWallpaper.name);

        // Mark session as used immediately to prevent reuse
        this.markSessionAsUsed(sessionId);

        // Show success message and start secure download
        this.showPaymentSuccessMessage();
        this.startSecureDownload();

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

        // Clear any selected wallpaper on payment error
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

    // Note: enableDownloads() removed - not needed for individual wallpaper purchases

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
        console.log('🔒 Executing secure wallpaper download...');

        // Final security validation before download
        if (!this.paymentVerified) {
            console.error('🔒 Security: Payment not verified at download time');
            this.showNotification('❌ Payment verification failed. Please try purchasing again.', 'error');
            return;
        }

        if (!filename || !name) {
            console.error('🔒 Security: Missing filename or name at download time');
            this.showNotification('❌ Invalid download parameters. Please contact support.', 'error');
            return;
        }

        // Security: Sanitize filename to prevent path traversal
        const sanitizedFilename = filename.replace(/[^a-zA-Z0-9._-]/g, '');
        if (sanitizedFilename !== filename) {
            console.error('🔒 Security: Filename sanitization failed:', filename);
            this.showNotification('❌ Invalid filename format. Please contact support.', 'error');
            return;
        }

        try {
            console.log(`✅ Starting secure download: ${name} (${sanitizedFilename})`);

            // Show download starting notification
            this.showNotification(`🎨 Starting download of "${name}" wallpaper...`, 'info');

            // Create secure download link
            const link = document.createElement('a');
            link.href = `wallpapers/${sanitizedFilename}`;
            link.download = `${name.replace(/[^a-zA-Z0-9\s._-]/g, '').replace(/\s+/g, '_')}_by_aeronautyy.png`;
            link.style.display = 'none';
            link.rel = 'noopener noreferrer'; // Security: Prevent window.opener access

            // Add to DOM, trigger download, and clean up
            document.body.appendChild(link);
            link.click();

            // Immediate cleanup
            setTimeout(() => {
                if (link.parentNode) {
                    document.body.removeChild(link);
                }
            }, 100);

            // Show success notification
            setTimeout(() => {
                this.showNotification(`✅ "${name}" wallpaper downloaded successfully! Thank you for your purchase.`, 'success');
            }, 500);

            // Track download securely
            this.trackSecureDownload(sanitizedFilename, name);

            console.log('✅ Secure download completed successfully');

        } catch (error) {
            console.error('🔒 Security: Download execution failed:', error);
            this.showNotification(`❌ Failed to download "${name}" wallpaper. Please contact support.`, 'error');
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

    startSecureDownload() {
        console.log('🔒 Starting secure download process...');

        // Security: Multiple validation checks
        if (!this.paymentVerified) {
            console.error('🔒 Security: Payment not verified');
            this.showNotification('❌ Payment verification failed. Please try again.', 'error');
            return;
        }

        if (this.downloadAttempted) {
            console.error('🔒 Security: Download already attempted');
            this.showNotification('❌ Download already completed for this payment.', 'error');
            return;
        }

        if (!this.selectedWallpaper || !this.selectedWallpaper.filename || !this.selectedWallpaper.name) {
            console.error('🔒 Security: Invalid wallpaper selection');
            this.showNotification('❌ Invalid wallpaper selection. Please try purchasing again.', 'error');
            return;
        }

        if (!this.sessionId) {
            console.error('🔒 Security: No valid session ID');
            this.showNotification('❌ Invalid payment session. Please try purchasing again.', 'error');
            return;
        }

        // Security: Check payment timestamp (prevent old session reuse)
        const currentTime = Date.now();
        const maxAge = 10 * 60 * 1000; // 10 minutes
        if (this.paymentTimestamp && (currentTime - this.paymentTimestamp) > maxAge) {
            console.error('🔒 Security: Payment session expired');
            this.showNotification('❌ Payment session expired. Please make a new purchase.', 'error');
            return;
        }

        // Mark download as attempted BEFORE starting download
        this.downloadAttempted = true;

        console.log('✅ All security checks passed. Downloading:', this.selectedWallpaper.name);

        // Start the secure download with a small delay
        setTimeout(() => {
            this.executeSecureDownload();
        }, 1000);
    }

    executeSecureDownload() {
        // Final security check before download
        if (!this.downloadAttempted || !this.paymentVerified || !this.selectedWallpaper) {
            console.error('🔒 Security: Final security check failed');
            return;
        }

        const wallpaper = this.selectedWallpaper;

        try {
            // Download the specific wallpaper
            this.downloadWallpaper(wallpaper.filename, wallpaper.name);

            // Immediately clear all sensitive data after download starts
            this.clearSecureSession();

        } catch (error) {
            console.error('🔒 Security: Download execution failed:', error);
            this.showNotification('❌ Download failed. Please contact support.', 'error');
        }
    }

    clearSecureSession() {
        console.log('🔒 Clearing secure session data...');

        // Clear all session data
        this.selectedWallpaper = null;
        this.paymentVerified = false;
        this.sessionId = null;
        this.paymentTimestamp = null;

        // Clear localStorage
        localStorage.removeItem('selected_wallpaper');

        console.log('✅ Secure session cleared');
    }

    // Removed downloadAllWallpapers and related functions
    // Payment should only download the specific selected wallpaper



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

    trackSecureDownload(filename, name) {
        console.log(`🔒 Tracking secure download: ${name} (${filename})`);

        try {
            // Store download history with security metadata
            const downloads = JSON.parse(localStorage.getItem('wallpaper_downloads') || '[]');
            const downloadRecord = {
                filename: filename,
                name: name,
                timestamp: new Date().toISOString(),
                sessionId: this.sessionId,
                paymentTimestamp: this.paymentTimestamp,
                secureHash: this.generateSecureToken() // Unique identifier for this download
            };

            downloads.push(downloadRecord);

            // Keep only last 100 downloads to prevent localStorage bloat
            if (downloads.length > 100) {
                downloads.splice(0, downloads.length - 100);
            }

            localStorage.setItem('wallpaper_downloads', JSON.stringify(downloads));

            console.log('✅ Download tracked securely');

            // Could send to analytics service with security context
            // gtag('event', 'secure_download', {
            //     'event_category': 'wallpaper',
            //     'event_label': name,
            //     'custom_parameter_session': this.sessionId
            // });

        } catch (error) {
            console.error('🔒 Security: Failed to track download:', error);
            // Don't fail the download if tracking fails
        }
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
