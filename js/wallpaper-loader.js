/**
 * Dynamic Wallpaper Loader
 * Loads all wallpapers dynamically from wallpapers-data.js
 */

class WallpaperLoader {
    constructor() {
        this.wallpapers = wallpapersData;
        this.container = null;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.loadWallpapers());
        } else {
            this.loadWallpapers();
        }
    }

    loadWallpapers() {
        console.log('🔧 Loading wallpapers...', this.wallpapers.length, 'wallpapers found');

        // Find the wallpaper container
        this.container = document.querySelector('.wallpaper-gallery-container');

        if (!this.container) {
            console.error('❌ Wallpaper container not found');
            return;
        }

        console.log('✅ Container found:', this.container);

        // Clear existing content
        this.container.innerHTML = '';

        // Create wallpaper grid - 2 columns for better display
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-12';

        // Generate wallpaper cards
        this.wallpapers.forEach((wallpaper, index) => {
            console.log(`🎨 Creating card ${index + 1}:`, wallpaper.name, wallpaper.price);
            const card = this.createWallpaperCard(wallpaper);
            grid.appendChild(card);
        });

        this.container.appendChild(grid);

        // Add interaction handlers
        this.addInteractionHandlers();

        // Render math equations after loading
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(this.container, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ]
            });
        }
    }

    createWallpaperCard(wallpaper) {
        console.log('🔧 Creating card for:', wallpaper.name, 'Price:', wallpaper.price, 'URL:', wallpaper.buyButtonUrl);

        const card = document.createElement('div');
        card.className = 'wallpaper-card notion-container rounded-xl overflow-hidden';

        // Determine equation text size based on length and complexity
        let equationSize = '';
        const equationLength = wallpaper.equation.length;
        const hasComplexSymbols = /[∑∏∫∂∇∞√∆∈∉⊂⊃∪∩∧∨¬∀∃]/.test(wallpaper.equation);
        const hasMatrices = /\\begin\{(pmatrix|bmatrix|matrix)\}/.test(wallpaper.equation);
        const hasFractions = /\\frac\{/.test(wallpaper.equation);

        if (equationLength > 120 || hasMatrices) {
            equationSize = 'text-xs';
        } else if (equationLength > 80 || hasComplexSymbols || hasFractions) {
            equationSize = 'text-sm';
        } else {
            equationSize = 'text-base';
        }

        card.innerHTML = `
            <div class="card-image relative">
                <img src="wallpapers/${wallpaper.filename}" alt="${wallpaper.name}"
                     class="image-loading"
                     loading="lazy"
                     onload="this.classList.remove('image-loading'); this.classList.add('loaded');"
                     onerror="this.classList.remove('image-loading'); this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4='; this.classList.add('loaded');">
                <div class="absolute top-4 right-4 z-10">
                    <span class="bg-${wallpaper.color}-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                        ${wallpaper.category}
                    </span>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div class="card-content">
                <div class="card-header">
                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        ${wallpaper.name}
                    </h3>
                </div>

                <div class="card-description">
                    <p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        ${wallpaper.description}
                    </p>
                </div>

                <!-- Mathematical Formula -->
                <div class="math-equation">
                    <div class="text-center ${equationSize} overflow-hidden">
                        $$${wallpaper.equation}$$
                    </div>
                </div>

                <div class="stripe-buy-button-container" data-wallpaper="${wallpaper.name}">
                    <a href="${wallpaper.buyButtonUrl}"
                       class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105"
                       data-wallpaper-filename="${wallpaper.filename}"
                       data-wallpaper-name="${wallpaper.name}"
                       target="_blank"
                       rel="noopener noreferrer">
                        <i class="fas fa-download mr-2"></i>
                        Buy & Download - ${wallpaper.price}
                    </a>
                </div>
            </div>
        `;

        return card;
    }

    addInteractionHandlers() {
        // Add click handlers for cards
        const cards = this.container.querySelectorAll('.wallpaper-card');
        cards.forEach(card => {
            // Add ripple effect on click
            card.addEventListener('click', (e) => {
                // Don't trigger if clicking on Stripe button
                if (e.target.closest('stripe-buy-button')) return;

                this.createRippleEffect(e, card);
            });

            // Add loading state to buy buttons
            const buyButton = card.querySelector('a[data-wallpaper-filename]');
            if (buyButton) {
                buyButton.addEventListener('click', () => {
                    const container = buyButton.closest('.stripe-buy-button-container');
                    container.classList.add('loading');

                    // Add loading text
                    const originalText = buyButton.innerHTML;
                    buyButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Redirecting to payment...';

                    // Restore original text after redirect (fallback)
                    setTimeout(() => {
                        buyButton.innerHTML = originalText;
                        container.classList.remove('loading');
                    }, 3000);
                });
            }

            // Add hover sound effect (optional)
            card.addEventListener('mouseenter', () => {
                // Could add subtle sound effect here
                card.style.setProperty('--hover-scale', '1.02');
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--hover-scale', '1');
            });
        });
    }

    createRippleEffect(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 10;
        `;

        // Add ripple animation keyframes if not already added
        if (!document.querySelector('#ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);

        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Method to filter wallpapers by category
    filterByCategory(category) {
        const filteredWallpapers = category === 'all' 
            ? this.wallpapers 
            : this.wallpapers.filter(w => w.category.toLowerCase() === category.toLowerCase());

        this.renderWallpapers(filteredWallpapers);
    }

    // Method to search wallpapers
    searchWallpapers(query) {
        const filteredWallpapers = this.wallpapers.filter(w => 
            w.name.toLowerCase().includes(query.toLowerCase()) ||
            w.description.toLowerCase().includes(query.toLowerCase()) ||
            w.category.toLowerCase().includes(query.toLowerCase())
        );

        this.renderWallpapers(filteredWallpapers);
    }

    renderWallpapers(wallpapers) {
        if (!this.container) return;

        // Clear existing content
        this.container.innerHTML = '';

        // Create wallpaper grid - 2 columns for better display
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 lg:grid-cols-2 gap-12';

        // Generate wallpaper cards
        wallpapers.forEach(wallpaper => {
            const card = this.createWallpaperCard(wallpaper);
            grid.appendChild(card);
        });

        this.container.appendChild(grid);

        // Render math equations
        if (typeof renderMathInElement !== 'undefined') {
            renderMathInElement(this.container, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ]
            });
        }
    }

    // Get wallpaper statistics
    getStats() {
        const categories = {};
        this.wallpapers.forEach(w => {
            categories[w.category] = (categories[w.category] || 0) + 1;
        });

        return {
            total: this.wallpapers.length,
            categories: categories
        };
    }
}

// Initialize wallpaper loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.wallpaperLoader = new WallpaperLoader();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WallpaperLoader;
}
